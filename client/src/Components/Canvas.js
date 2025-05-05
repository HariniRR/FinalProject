import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEraser, FaSave, FaArrowLeft } from "react-icons/fa";

const Canvas = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [fillColor, setFillColor] = useState("#ff0000"); 

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.7; 
    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = brushColor;
    context.lineWidth = brushSize;
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    contextRef.current = context;
  }, []);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = brushColor;
      contextRef.current.lineWidth = brushSize;
    }
  }, [brushColor, brushSize]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    contextRef.current.fillStyle = "#ffffff";
    contextRef.current.fillRect(0, 0, canvas.width, canvas.height);
  };

  // Flood Fill Algorithm
  const floodFill = (x, y, newColor) => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    const width = canvas.width;

    const getPixelColor = (x, y) => {
      const index = (y * width + x) * 4;
      return [pixels[index], pixels[index + 1], pixels[index + 2], pixels[index + 3]];
    };

    const setPixelColor = (x, y, color) => {
      const index = (y * width + x) * 4;
      pixels[index] = color[0];
      pixels[index + 1] = color[1];
      pixels[index + 2] = color[2];
      pixels[index + 3] = color[3];
    };

    const targetColor = getPixelColor(x, y);
    const fillColorArray = [
      parseInt(newColor.substring(1, 3), 16),
      parseInt(newColor.substring(3, 5), 16),
      parseInt(newColor.substring(5, 7), 16),
      255,
    ];

    if (JSON.stringify(targetColor) === JSON.stringify(fillColorArray)) return;

    const stack = [[x, y]];
    while (stack.length) {
      const [px, py] = stack.pop();
      if (px < 0 || py < 0 || px >= width || py >= canvas.height) continue;
      if (JSON.stringify(getPixelColor(px, py)) !== JSON.stringify(targetColor)) continue;
      setPixelColor(px, py, fillColorArray);
      stack.push([px + 1, py], [px - 1, py], [px, py + 1], [px, py - 1]);
    }

    ctx.putImageData(imageData, 0, 0);
  };

  const fillCanvas = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    floodFill(offsetX, offsetY, fillColor);
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "my_artwork.png";
    link.click();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🎨 Canvas </h2>
      <div style={styles.controls}>
        <label>Brush Color: </label>
        <input type="color" value={brushColor} onChange={(e) => setBrushColor(e.target.value)} />
        <label style={{ marginLeft: "15px" }}>Brush Size: </label>
        <input type="range" min="1" max="20" value={brushSize} onChange={(e) => setBrushSize(e.target.value)} />
        <label style={{ marginLeft: "15px" }}>Fill Color: </label>
        <input type="color" value={fillColor} onChange={(e) => setFillColor(e.target.value)} />
        <button onClick={clearCanvas} style={styles.button}> <FaEraser/> Clear</button>
        <button onClick={saveCanvas} style={styles.button}> <FaSave/> Save</button>
        <button onClick={() => navigate("/games")} style={styles.button}><FaArrowLeft/> </button> 

      </div>
      <div style={styles.canvasContainer}>
        <canvas
          ref={canvasRef}
          style={styles.canvas}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={finishDrawing}
          onMouseLeave={finishDrawing}
          onClick={fillCanvas}
        />
      </div>
    </div>
  );
};

const styles = {
  container: { textAlign: "center", fontFamily: "Arial, sans-serif", padding: "20px", background: "#f5f5f5" },
  title: { fontSize: "24px", fontWeight: "bold", color: "#333" },
  controls: { display: "flex", justifyContent: "center", alignItems: "center", gap: "15px", marginBottom: "15px" },
  canvasContainer: { display: "flex", justifyContent: "center", alignItems: "center", border: "4px solid #444", borderRadius: "10px", background: "#fff", padding: "10px", height: "530px" },
  canvas: { background: "#fff", cursor: "crosshair" },
  button: { padding: "8px 15px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", marginLeft: "10px" },
};

export default Canvas;
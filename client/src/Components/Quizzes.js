import React, { useState } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import LegalRights from "../Assets/Legalrights.jpg";
import ChildrenRights from "../Assets/Childrenrights1.jpg";
import WomenRights from "../Assets/Womenrights1.jpg";
import Mentalwellbeing from "../Assets/Mentalwellbeing.jpg";
import Safetymeasures from "../Assets/Safetymeasures.jpg";
import Emergency from "../Assets/Emergency.jpg";

const quizQuestions = [
  {
    category: "Legal Rights",
    questions: [
      {question: "What is the primary source of legal rights?",options: ["Government Policies","Constitution","Social Media","News Channels"],correctAnswer: "Constitution",},
      { question:"What is a legal right?",options:["A rule you must follow","A type of course","Something everyone should have","A fun game"],correctAnswer:"Something everyone should have",},
      { question:"Who makes the laws?",options:["Government","Friends","Teachers","Scientists"],correctAnswer:"Government",},
      { question:"What does 'freedom' mean?",options:["Being tired","Being free to work","Being free to think and act","Being bored"],correctAnswer:"Being free to think and act",},
      { question:"What is a law?",options:["A secret code","A guideline","A rule that people must follow","A personal choice"],correctAnswer:"A rule that people must follow",},
      { question:"What does 'justice' mean?",options:["Unfair treatment","Rule","Activity","Fair treatment"],correctAnswer:"Fair treatment",},
      { question:"What is a legal punishment?",options:["Penalty","Activity","Reward","Money"],correctAnswer:"Penalty",},
      { question:"What should you do if someone breaks the law?",options:["Stay silent","Join them","Ignore the situation","Report to the police"],correctAnswer:"Report to the police",},
      { question:"If a person's fundamental rights are violated, where can they seek justice?",options:["Classsroom","Supreme court or High court","Local panchayat","Police station"],correctAnswer:"Supreme court or High court",},
      { question:"What is the purpose of legal rights?",options:["To make life difficult","To protect people from unfair treatment","To do anything","To allow only the rich to succeed"],correctAnswer:"To protect people from unfair treatment",},
      { question:"Which legal right ensures that every person is treated equally before the law?",options:["Right to Privacy","Right to Freedom","Right to Life","Right to Equality"],correctAnswer:"Right to Equality",},
      { question:"If someone is arrested, which right allows them to get legal help?",options:["Right to Freedom","Right to Legal Aid","Right to Education","Right to Life"],correctAnswer:"Right to Legal Aid",},
    ],
  },
  {
    category: "Children Rights",
    questions: [
      { question:"Who is considered a child?",options:["A person below 15 years old","A person above 18 years old","A person below 18 years old","A person below 7 years old"],correctAnswer:"A person below 18 years old",},
      { question:"What does the term 'Right to Identity' mean for children?",options:["A child must choose their own name","Every child must have a name, nationality, and legal identity","Only adults need identification","Identify children rights"],correctAnswer:"Every child must have a name, nationality, and legal identity",},
      { question:"What is the main purpose of the Right to Education (RTE) Act?",options:["To give free books to all students","To promote online education","To provide free and compulsory education to children","Sending children to school"],correctAnswer:"To provide free and compulsory education to children",},
      { question:"Which number can a child call for help in India?",options:["7373","1098","100","1234"],correctAnswer:"1098",},
      { question:"What is the minimum age for a child to work legally in India?",options:["14","13","18","No age limit"],correctAnswer:"14",},
      { question:"Which of the following is a right of every child?",options:["Right to Play and Rest","Right to Protection","Right to Education","All the above"],correctAnswer:"All the above",},
      { question:"If a child is forced to work in a factory, which right is being violated?",options:["Right to Life","Right to Protection","Right to Privacy","Right to Express "],correctAnswer:"Right to Protection",},
      { question:"Which organization works for children's welfare worldwide?",options:["FIFA","WHO","UNICEF","UNESCO"],correctAnswer:"UNICEF",},
      { question:"Which law protects children from hazardous work in India?",options:["Child Labour (Prohibition and Regulation) Act","Cybercrime Act","Right to Work","Right to Education"],correctAnswer:"Child Labour (Prohibition and Regulation) Act",},
      { question:"What is the purpose of the POCSO Act?",options:["To allow children to school","To allow children to work","Protecting children's rights","To protect children from sexual offenses"],correctAnswer:"To protect children from sexual offenses",},
      // { question:"",options:["","","",""],correctAnswer:"",},
    ],
  },
  {
    category: "Women Rights",
    questions:[
      { question:"What term is used for a female who is legally an adult?",options:["Girl","Miss","Women","Lady"],correctAnswer:"Women",},
      { question:"Can women own and inherit property in India?",options:["Only if they are married","No","Yes","Only if their family allows"],correctAnswer:"Yes",},
      { question:"Which international day is celebrated on March 8th to promote women's rights?",options:["National Women's Day","Women Empowerment Day","International Women's Day","Women's Opportunity Day"],correctAnswer:"International Women's Day",},
      { question:"What is the legal age for voting in India?",options:["18 years","15 years","17 years","21 years"],correctAnswer:"18 years",},
      { question:"Which Indian law prohibits dowry?",options:["The Domestic Violence Act","The Special Marriage Act","The Hindu Marriage Act","The Dowry Prohibition Act"],correctAnswer:"The Dowry Prohibition Act",},
      { question:"Which of the following is NOT covered under the Protection of Women from Domestic Violence Act?",options:["Emotional abuse"," Property disputes","Physical abuse","Economic abuse"],correctAnswer:" Property disputes",},
      { question:"Which document is considered a foundation for women's rights worldwide?",options:["Magna Carta","Universal Declaration of Human Rights (UDHR)","The Communist Manifesto","Treaty of Versailles"],correctAnswer:"Universal Declaration of Human Rights (UDHR) ",},
      { question:"Which international organization promotes gender equality in employment?",options:["WTO","WHO","ILO","UNESCO"],correctAnswer:"ILO",},
      { question:"Which act ensures that men and women receive equal pay for the same work in India?",options:["The Payment of Wages Act","The Equal Remuneration Act","The Women's Protection Act","The Factories Act"],correctAnswer:"The Equal Remuneration Act",},
      { question:"At what age can a woman legally marry in India as per the 2024 law?",options:["22 years","21 years","18 years","25 years"],correctAnswer:"21 years",},
      { question:"Which women are entitled to claim maintenance under Indian law?",options:["Only women with children","Only working women","Only housewives","Divorced and separated women"],correctAnswer:"Divorced and separated women",},
      { question:"How many weeks of maternity leave does a working woman get in India?",options:["26 weeks","37 weeks","12 weeks","20 weeks"],correctAnswer:"26 weeks",},
      { question:"At what age is a female generally called a 'woman'?",options:["!8 years and above","10 years","20 years and above","30 years"],correctAnswer:"!8 years and above",},
      { question:"Which law allows a wife to seek maintenance after divorce?",options:["Indian Penal Code","Hindu Marriage Act","Women Protection Act","Dowry Prohibition Act"],correctAnswer:"Hindu Marriage Act",},
      { question:"Under IPC, when is a woman allowed to use self-defense to protect herself?",options:["Only when a police officer is present","Only when attacked at home","When there is an immediate threat to life or dignity","Never"],correctAnswer:"When there is an immediate threat to life or dignity",},
    ],
  },
  {
    category: "Mental Well-being",
    questions:[
      { question:"What is mental well-being?",options:["A state of emotional, psychological, and social well-being","A physical illness","The absence of emotions","Ignoring stress and emotions"],correctAnswer:"A state of emotional, psychological, and social well-being",},
      { question:"How can children improve their mental well-being?",options:["Avoiding social interactions","Ignoring problems","Keeping their emotions to themselves","Expressing their feelings in a healthy way"],correctAnswer:"Expressing their feelings in a healthy way",},
      { question:"Which of the following is a sign of good mental well-being?",options:["Feeling sad","Ignoring personal needs","Managing stress and emotions effectively ","Feeling happy"],correctAnswer:"Managing stress and emotions effectively ",},
      { question:"How can deep breathing exercises help in mental well-being",options:["Make people sleepy","Increase stress","Help relax the mind and body","No effect"],correctAnswer:"Help relax the mind and body",},
      { question:"What should a child do if they feel overwhelmed with schoolwork?",options:["Talk to a teacher or parent for support","Stay quiet","Stop doing their homework","Struggle alone"],correctAnswer:"Talk to a teacher or parent for support",},
      { question:"Which activity can help improve mental well-being?",options:["Watching TV","Overworking without breaks","Regular physical exercise","Keep calm"],correctAnswer:"Regular physical exercise",},
      { question:"What should a woman do if she constantly feels anxious or stressed?",options:["Talk to a trusted person or seek professional help ","Avoid thinking about her problems","Stay busy","Keep calm"],correctAnswer:"Talk to a trusted person or seek professional help ",},
      { question:"What is the importance of playtime for children’s mental well-being?",options:["It makes them lazy","It helps them express emotions and develop social skills","It is a waste of time","It only improves physical health"],correctAnswer:"It helps them express emotions and develop social skills",},
      { question:"What is one healthy way to deal with anger?",options:["Taking deep breaths and talking about feelings ","Expressing it through violent actions","Suppressing it completely","Shouting at others"],correctAnswer:"Taking deep breaths and talking about feelings ",},
      { question:"How does positive self-talk help mental well-being?",options:["No effect on emotions","Leads to more stress"," Encourages self-confidence and reduces stress","Makes people unrealistic"],correctAnswer:"Encourages self-confidence and reduces stress",},
      { question:"How can women manage workplace stress effectively?",options:["Work extra hours to cope with stress","Ignore feelings of burnout","Avoid talking about work problems","Set boundaries and practice time management"],correctAnswer:"Set boundaries and practice time management",},
      { question:"What is one way women can practice self-care?",options:["Avoiding social connections","Overworking without breaks","Engaging in hobbies and relaxation activities","Ignoring their emotions"],correctAnswer:"Engaging in hobbies and relaxation activities",},
      { question:"How can a child handle bullying in a healthy way?",options:["Fight back physically","Report the bullying to a trusted adult","Stay silent and accept it","Ignore it"],correctAnswer:"Report the bullying to a trusted adult",},
      { question:"How does spending time in nature affect mental health?",options:["No impact on mental health","Reduces stress and improves mood","Feel happy","Increase stress level"],correctAnswer:"Reduces stress and improves mood",},
      { question:"What is one major factor that negatively impacts mental well-being?",options:["Spending too much time on social media","Regular exercise","Practicing gratitude","Strong social support"],correctAnswer:"Spending too much time on social media",},
    ],
  },
  {
    category: "Safety Measures",
    questions:[
      { question:"Which of the following is the best self-defense move if someone tries to grab you?",options:["Stay silent and wait for help","Close your eyes and hope they leave","Scream, hit sensitive areas, and run","Politely ask them to let go"],correctAnswer:"Scream, hit sensitive areas, and run",},
      { question:"If a child is home alone and someone knocks on the door, what should they do?",options:["Open the door","Ignore","None","Ask who it is but never open the door for strangers"],correctAnswer:"Ask who it is but never open the door for strangers",},
      { question:"What should a child do if they get lost in a public place?",options:["Go with any stranger who offers help","Cry and wait for someone to find them","Find a police officer","Keep walking until they reach home"],correctAnswer:"Find a police officer",},
      { question:"What should children do if a stranger offers them a ride or gifts?",options:["Keep silent"," Accept it","Say thankyou"," Ignore and walk away quickly"],correctAnswer:" Ignore and walk away quickly",},
      { question:"If a child experiences bullying at school, what should they do?",options:["Stay silent ","Report to a teacher or parent","Accept it","Change schools immediately"],correctAnswer:"Report to a teacher or parent",},
      { question:"Which of the following is NOT a good personal safety habit?",options:["Being aware of surroundings","Learning self-defense techniques","Keeping emergency contacts handy","Sharing personal details with strangers "],correctAnswer:"Sharing personal details with strangers ",},
      { question:"What is the best way for women to carry self-defense tools while traveling?",options:["Keep pepper spray in an easily accessible place","Avoid carrying any self-defense tools","Use self-defence tools","Both A and C"],correctAnswer:"Both A and C",},
      { question:"What is the best way to protect personal information online?",options:["Use strong passwords","Avoid sharing personal details","Share passwords with others","Both A and B"],correctAnswer:"Both A and B",},
      { question:"What is the best way to teach children about 'Good Touch' and 'Bad Touch'?",options:["Teach them early using simple and clear words","None","Let children figure it out on their own","Avoid discussing such topics"],correctAnswer:"Teach them early using simple and clear words",},
      { question:"If a woman feels uncomfortable with someone's behavior at work, what is the first step she should take?",options:["gnore it and hope it stops","Leave the job immediately","Report it to HR or the Internal Complaints Committee","Tell a co-worker but take no action"],correctAnswer:"Report it to HR or the Internal Complaints Committee",},
      { question:"What should women do when traveling in a taxi or ride-sharing service?",options:["Sit in the front seat for safety","Sleep during the ride","Share ride details with a trusted contac"," "],correctAnswer:"Share ride details with a trusted contac",},
      { question:"What is an effective way to escape an attacker?",options:["Scream, fight back, and run"," Follow their instructions","Try to negotiate","Freeze and hope they leave"],correctAnswer:"Scream, fight back, and run",},
    ],
  },{
    category: "Emergency Helpline",
    questions:[
      { question:"What is an emergency helpline?",options:["A number to order food","A number to call for help in dangerous situations","A number to call friends","A number to book a taxi"],correctAnswer:"A number to call for help in dangerous situations",},
      { question:"What is the national emergency helpline number in India for all emergencies?",options:["112","102","123","420"],correctAnswer:"112",},
      { question:"Which number should a child call if they need protection or help?",options:["1098","1000","112","3700"],correctAnswer:"1098",},
      { question:"If a woman is in danger, which emergency number should she call in India?",options:["1091","911","7315","1098"],correctAnswer:"1091",},
      { question:"Which emergency number should you call for the police in India?",options:["108","1234","100","7373"],correctAnswer:"100",},
      { question:"What is the emergency number for an ambulance in India?",options:["1003","108","118","102"],correctAnswer:"108",},
      { question:"Why should everyone be aware of emergency helpline numbers?",options:["To use them for casual conversations","To show off knowledge to others","To check if they actually work","To ensure quick assistance in urgent situations"],correctAnswer:"To ensure quick assistance in urgent situations",},
      { question:"What should you do if you accidentally dial an emergency number?",options:["Tell a joke","Call again","Stay silent and listen","Apologize and disconnect"],correctAnswer:"Apologize and disconnect",},
      { question:"What should you do if you call an emergency helpline but cannot speak?",options:["Stay on the line and make noise","Text the helpline","wait","Hang up the phone"],correctAnswer:"Stay on the line and make noise",},
      { question:"Which emergency number should be dialed for railway accidents in India?",options:["135","164","182","423"],correctAnswer:"182",},
    ],
  },
];


const Quiz = () => {
  const [stage, setStage] = useState("landing");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [reviewAnswers, setReviewAnswers] = useState([]);

  const handleAttemptNow = (category) => {
    setSelectedCategory(category);
    setStage("instructions");
  };


  const handleStart = () => {
    setStage("quiz");
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
    setShowResults(false);
    setReviewAnswers([]);
  };

  const handleNext = () => {
    if (selectedOption !== null) {
      const currentQuiz = quizQuestions.find(
        (q) => q.category === selectedCategory
      );

      // Check if the selected option is correct
      const isCorrect =
        currentQuiz.questions[currentQuestion].options[selectedOption] ===
        currentQuiz.questions[currentQuestion].correctAnswer;

      if (isCorrect) {
        setScore((prevScore) => prevScore + 1);
      }

      // Store the question, selected option, and correctness for review
      setReviewAnswers((prev) => [
        ...prev,
        {
          question: currentQuiz.questions[currentQuestion].question,
          selectedOption: currentQuiz.questions[currentQuestion].options[selectedOption],
          correctAnswer: currentQuiz.questions[currentQuestion].correctAnswer,
          isCorrect,
        },
      ]);

      setSelectedOption(null);

      if (currentQuestion < currentQuiz.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResults(true);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(null);
    }
  };

  const currentQuiz = quizQuestions.find(
    (q) => q.category === selectedCategory
  );
  const passingScore = currentQuiz ? Math.ceil(currentQuiz.questions.length / 2) : 0;

  return (
    <>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
      <div className="header">Quiz</div></div>

      <Container className="mt-5 text-center" >
        {/* Landing Page */}
        {stage === "landing" && (
          <Row>
            {[
              {
                label: "Legal Rights",
                image: LegalRights,
                description:
                  "Understand the fundamental legal rights that protect individuals in society.",
              },
              {
                label: "Children Rights",
                image: ChildrenRights,
                description:
                  "Learn about the laws and policies safeguarding children's rights.",
              },
              {
                label: "Women Rights",
                image: WomenRights,
                description:
                  "Explore the rights and protections available for women globally.",
              },
              {
                label: "Mental Well-being",
                image: Mentalwellbeing,
                description:
                  "Understand the importance of mental well-being and effective self-care practices.",
              },
              {
                label: "Safety Measures",
                image: Safetymeasures,
                description:
                  "Understand the importance of safety measures and risk prevention strategies.",
              },
              {
                label: "Emergency Helpline",
                image: Emergency,
                description:
                  "Understand the importance of emergency helplines and their role.",
              },
            ].map((quiz, index) => (
              <Col key={index} md={4} className="mb-4">
                <Card className="quiz-card">
                  <Card.Img
                    variant="top"
                    src={quiz.image}
                    className="quiz-image"
                  />
                  <Card.Body>
                    <Card.Title className="quiz-title">{quiz.label}</Card.Title>
                    <Card.Text>{quiz.description}</Card.Text>
                    <Button
                      variant="primary"
                      className="attempt-btn"
                      onClick={() => handleAttemptNow(quiz.label)}
                    >
                      Attempt Now
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Instructions */}
        {stage === "instructions" && (
          <Card className="p-4 instructions-card">
            <h2>Quiz Instructions</h2>
            <ul className="instructions-list">
              <li>
                Total Number of Questions: <strong>{currentQuiz.questions.length}</strong>
              </li>
              <li>
                Each Question Carries <strong>2 Marks</strong>
              </li>
              <li>
                Passing Score: <strong>50%</strong> (Minimum <strong>{Math.ceil(currentQuiz.questions.length / 2)}</strong>{" "}
                Correct Answers)
              </li>
              <li>
                Select the correct option and click <strong>Next</strong> to proceed.
              </li>
              <li>You can go back to <strong>Previous</strong> questions before submitting.</li>
              <li>
                Click <strong>Submit</strong> after answering all questions.
              </li>
              <li>Once submitted, you will see your <strong> Result</strong>.</li>
              <li>Click <strong>Review</strong> to evaluate your answers.</li>
              <li>
                Click <strong>Reset</strong> to start over.
              </li>
            </ul>
            <Button variant="success" onClick={handleStart}>
              Start Quiz
            </Button>
          </Card>
        )}

        {/* Quiz */}
        {stage === "quiz" && currentQuiz && (
          <Container className="d-flex justify-content-center align-items-center vh-100">
            <Row>
              <Col md={12}>
                <Card
                  className="p-4 text-center shadow-lg border-primary"
                  style={{ marginBottom: "200px" }}
                >
                  {showResults ? (
                    <>
                      <div className="results-container">
                        <div className="icon-container">
                          {score >= passingScore ? (
                            <span className="checkmark">✔</span>
                          ) : (
                            <span className="crossmark">✖</span>
                          )}
                        </div>
                        <h2>Quiz Results</h2>
                        <p className="pass-message">
                          {score >= passingScore
                            ? "Great job, you passed!"
                            : "Sorry, you failed!"}
                        </p>

                        <div className="score-container">
                          <div
                            className={`score-box ${
                              score >= passingScore ? "pass" : "fail"
                            }`}
                          >
                            <h3> SCORE</h3>
                            <p className="score-value">
                              {((score / currentQuiz.questions.length) * 100).toFixed(
                                2
                              )}
                              %
                            </p>
                          </div>
                          <div
                            className={`score-box ${
                              score >= passingScore ? "pass" : "fail"
                            }`}
                          >
                            <h3> POINTS</h3>
                            <p className="score-value">{score * 2}</p>
                          </div>
                        </div>

                        <Button
                          className="extra-btn"
                          onClick={() => {
                            setStage("instructions");
                            setScore(0);
                            setCurrentQuestion(0);
                            setSelectedOption(null);
                            setShowResults(false);
                            setReviewAnswers([]); 
                          }}
                        >
                          Reset
                        </Button>&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button
                          className="extra-btn"
                          onClick={() => setStage("review")}
                        >
                          Review
                        </Button>
                      </div>
                      <Button onClick={() => setStage("landing")}>Back to Home</Button>
                    </>
                  ) : (
                    <>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="w-100 text-center">
                          {currentQuiz.questions[currentQuestion].question}
                        </h5>
                        <span className="badge bg-dark text-white p-2">
                          {currentQuestion + 1} / {currentQuiz.questions.length}
                        </span>
                      </div>
                      <Row className="mt-3">
                      {currentQuiz.questions[currentQuestion].options.map((option, index) => (
                        <Col key={index} md={6} className="mb-2">
                          <Button
                            variant={selectedOption === index ? "warning" : "outline-primary"}
                            className="w-100 d-flex align-items-center justify-content-start option-button"
                            onClick={() => setSelectedOption(index)}
                          >
                            <span
                              className="badge badge-pill text-white me-2"
                              style={{ backgroundColor: "black", minWidth: "30px", textAlign: "center" }}
                            >
                              {String.fromCharCode(65 + index)}
                            </span>
                            <span className="flex-grow-1 text-start">{option}</span>
                          </Button>
                        </Col>
                      ))}
                    </Row>
                      <div className="mt-3 d-flex justify-content-between">
                        <Button
                          onClick={handlePrevious}
                          disabled={currentQuestion === 0}
                        >
                          Previous
                        </Button>
                        <Button onClick={handleNext}>
                          {currentQuestion === currentQuiz.questions.length - 1
                            ? "Submit"
                            : "Next"}
                        </Button>
                      </div>
                    </>
                  )}
                </Card>
              </Col>
            </Row>
          </Container>
        )}

        {/* Review Stage */}
        
        {stage === "review" && (
          <Container className="d-flex justify-content-center align-items-center vh-100">
            <Row>
              <Col md={12}>
                <Card className="review-card p-4 text-center shadow-lg border-primary">
                  <h3>Review Your Answers</h3>
                  {reviewAnswers.map((item, index) => (
                    <Card key={index} className="mb-2" bg={item.isCorrect ? "success" : "danger"} text="white">
                      <Card.Body>
                        <Card.Title>{item.question}</Card.Title>
                        <p>Your Answer: {item.selectedOption}</p>
                        {item.isCorrect ? (
                          <p>✅ Correct</p>
                        ) : (
                          <p>Correct Answer: {item.correctAnswer}</p>
                        )}
                      </Card.Body>
                    </Card>
                  ))}
                  <h4 className="mt-3">Final Score : {score} </h4>
                  <h5>{score >= passingScore ? "🎉 Congratulations! You Passed!" : "❌ You Did Not Pass. Try Again!"}</h5>
                  <Button className="mt-3" onClick={() => { setStage("landing"); setScore(0); setCurrentQuestion(0); setReviewAnswers([]); }}>Restart</Button>
                </Card>
              </Col>
            </Row>
          </Container>
        )}

        {/* Styles */}
        <style jsx>{`
          .header {
            background: #2e18d7;
            color: white;
            text-align: center;
            padding: 15px;
            font-size: 24px;
            font-weight: bold;
            width: 100%;
            margin-bottom: 30px;
          }
          .quiz-card {
            background-color: #333;
            color: white;
            border-radius: 30px;
            overflow: hidden;
            box-shadow: 0 5px 8px rgba(0, 0, 0, 0.2);
          }
          .quiz-card:hover {
            transform: scale(1.05);
            border: 3px solid black;
            box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
          }
          .quiz-image {
            height: 230px;
            object-fit: cover;
          }
          .quiz-title {
            font-size: 1.5rem;
            font-weight: bold;
            text-align: center;
            margin-bottom: 10px;
          }
          .attempt-btn {
            width: 100%;
            background-color: #007bff;
            border: none;
            padding: 10px;
            font-size: 1rem;
            font-weight: bold;
          }
          .attempt-btn:hover {
            background-color: #0056b3;
          }
          .instructions-card {
            max-width: 600px;
            margin: auto;
            text-align: center;
          }
          .instructions-list {
            text-align: left;
            padding-left: 20px;
          }
          .instructions-list li {
            margin-bottom: 8px;
          }
          .results-container {
            text-align: center;
            padding: 20px;
          }
          .icon-container {
            font-size: 50px;
            font-weight: bold;
          }
          .checkmark {
            color: green;
          }
          .crossmark {
            color: red;
          }
          .pass-message {
            font-size: 18px;
            color: #333;
          }
          .score-container {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 20px;
          }
          .score-box {
            padding: 15px;
            border-radius: 10px;
            width: 200px;
            text-align: center;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            font-size: 18px;
          }
          .pass {
            background: #28a745; /* Green for pass */
            color: white;
          }
          .fail {
            background: #dc3545; /* Red for fail */
            color: white;
          }
          .score-value {
            font-size: 23px;
            font-weight: bold;
          }
          .extra-btn {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px 20px;
            font-size: 16px;
            border-radius: 5px;
            margin-top: 20px;
            cursor: pointer;
          }
          .extra-btn:hover {
            background-color: #0056b3;
          }
          .review-card {
            margin-top: 105rem;
          }
        `}</style>
      </Container>
    </>
  );
};

export default Quiz;
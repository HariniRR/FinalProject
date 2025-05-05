import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, InputGroup } from "react-bootstrap";
import { FaPhoneAlt, FaHospital, FaLifeRing, FaUserShield, FaHeartbeat, FaArrowAltCircleUp, FaSearch } from "react-icons/fa";
import { FaHandsHoldingChild, FaChildDress } from "react-icons/fa6";
import { GiPoliceOfficerHead } from "react-icons/gi";
import { IoHandLeftSharp } from "react-icons/io5";
import { MdHealthAndSafety } from "react-icons/md";


const icons = [
  { icon: FaHandsHoldingChild, color: "#4B0082" },
  { icon: FaChildDress, color: "#C71585" },
  { icon: GiPoliceOfficerHead, color: "#A52A2A" },
  { icon: IoHandLeftSharp, color: "#7D0552" },
  { icon: FaUserShield, color: "#473810" },
  { icon: FaPhoneAlt, color: "#007bff" },
  { icon: FaHospital, color: "#28a745" },
  { icon: FaLifeRing, color: "#0000FF" },
  { icon: FaHeartbeat, color: "#dc3545" },
  { icon: MdHealthAndSafety, color: "#4863A0" },
];
const resourcesData = {
  legalHelp: [
    {
      name: "Children in India and Their Right",
      url: "https://nhrc.nic.in/sites/default/files/ChildrenRights.pdf",
      description: "An overview of children's rights in India, focusing on legal frameworks and protections."
    },
    {
      name: "Child Rights and Protection",
      url: "https://www.tnteu.ac.in/admin/file_storage/cms/Child%20Rights%20and%20Protection%20-%20English%20(Final).pdf.pdf",
      description: "A comprehensive guide on child rights and protection measures in India."
    },
    {
      name: "Child Rights in India",
      url: "https://upr-info.org/sites/default/files/documents/2017-04/js17_upr27_ind_e_main.pdf",
      description: "A report discussing the status and challenges of child rights in India."
    },
    {
      name: "Women’s Rights in India",
      url: "https://nhrc.nic.in/sites/default/files/Women%E2%80%99s%20Rights%20in%20India%20complete_compressed.pdf",
      description: "An analysis of women's rights in India, covering legal provisions and societal issues."
    },
    {
      name: "Women Rights are Human Rights",
      url: "https://www.ohchr.org/sites/default/files/Documents/Events/WHRD/WomenRightsAreHR.pdf",
      description: "A publication emphasizing that women's rights are fundamental human rights."
    },
    {
      name: "Legal Rights Of Women",
      url: "https://www.iitk.ac.in/wc/data/Majlis_Legal-rights-of-women.pdf",
      description: "A detailed guide on the legal rights of women in India."
    },
    {
      name: "Women's and Childre's Rights",
      url: "https://www.unfpa.org/sites/default/files/pub-pdf/Women-Children_final.pdf",
      description: "this booklet otlines  the  rights of women and children in India."
    },
  ],
  safetyTips: [
    {
      name: "Child Protection Basics",
      url: "https://www.fhi360.org/wp-content/uploads/drupal/documents/child-protection-basics.pdf",
      description: "An introduction to the fundamental concepts of child protection."
    },
    {
      name: "Self-Defense Strategies",
      url: "https://www.ucdc.edu/sites/default/files/uploads/documents/Other/Personal%20Safety.pdf",
      description: "Strategies and tips for personal safety and self-defense."
    },
    {
      name: "Personal Safety for Children",
      url: "https://www.ed.gov/sites/ed/files/parents/academic/involve/safety/personal_safety.pdf",
      description: "A guide for parents on ensuring personal safety for children."
    },
    {
      name: "Women Safety Handbook",
      url: "https://ludhianacity.punjabpolice.gov.in/booklet/dishabooklet.pdf",
      description: "A handbook providing safety tips and guidelines for women."
    },
    {
      name: "Mental Health Tips",
      url: "https://www.mentalhealth.org.uk/sites/default/files/2022-07/mhf-our-best-ever-mental-health-tips-backed-by-research_0.pdf",
      description: "Research-backed tips for maintaining and improving mental health."
    },
    {
      name: "Mental Health and Wellbeing",
      url: "https://manodarpan.education.gov.in/assets/img/pdf/CBSE_MH_Manual.pdf",
      description: "A manual focusing on mental health and wellbeing strategies."
    },
    {
      name: "Mental Wellbeing Toolbox Handbook",
      url: "https://www.bristol.ac.uk/vetscience/media/docs/mental_wellbeing.pdf",
      description: "A comprehensive handbook offering tools and techniques for mental wellbeing."
    },
  ],
  helplines: [
    { name: "Child Helpline", number: "1098" },
    { name: "Women Helpline", number: "1091" },
    { name: "Police", number: "100" },
    { name: "Domestic Violence", number: "181" },
    { name: "Cyber Crime", number: "1930" },
    { name: "National Legal Services Authority (NALSA) Helpline Number", number: "15100" },
    { name: "National Human Rights Commission (NHRC) Complaint Helpline", number: "14433" },
    { name: "National Commission for Women (NCW) Legal Helpline", number: "7827170170" },
    { name: "Vandrevala Foundation Mental Health Helpline", number: "1860 266 2345" },
    { name: "iCall (Mental Health Counseling Service)", number: "+91 9152987821" }
  ],
  faqs: [
    { question: "What are human rights?", answer: "Human rights are universal legal guarantees protecting individuals and groups against actions and omissions that interfere with fundamental freedoms, entitlements and human dignity. Human rights law obliges Governments (principally) and other duty-bearers to do certain things and prevents them from doing others" },
    { question: "What are women's rights?", answer: " Women's rights are the rights and entitlements claimed for women and girls worldwide.women's rights include the right to bodily integrity and autonomy, to be free from sexual violence, to vote, to hold public office, to enter into legal contracts, to have equal rights in family law, to work, to fair wages or equal pay, to have reproductive rights, to own property, and to education" },
    { question: "What are children's rights?", answer: "Children's rights or the rights of children are a subset of human rights with particular attention to the rights of special protection and care afforded to minors.Children's rights includes their right to association with both parents, human identity as well as the basic needs for physical protection, food, universal state-paid education, health care, and criminal laws appropriate for the age and development of the child, equal protection of the child's civil rights, and freedom from discrimination on the basis of the child's race, gender, sexual orientation, gender identity, national origin, religion, disability, color, ethnicity, or other characteristics." },
    { question: "How can a woman file a complaint if she faces online harassment?", answer: "Women can report cyberstalking, abuse, and threats under the Information Technology (IT) Act, 2000, and IPC Sections 354A (sexual harassment), 354D (stalking), and 507 (criminal intimidation by anonymous communication). Complaints can be filed at the Cybercrime portal (www.cybercrime.gov.in), local police stations, or cyber police cells." },
    { question: "How can children recognize and report unsafe touch?", answer: "Children should be taught the No, Go, Tell rule—say NO firmly, GO to a safe place, and TELL a trusted adult. They should also know that their body belongs to them and that they should never be forced to keep secrets about inappropriate touch. The Protection of Children from Sexual Offences (POCSO) Act, 2012, ensures strict punishment for offenders and prioritizes child safety." },
    { question: "What should I do if I’m being stalked or harassed online?", answer: "Report the harassment to the platform where it occurred, and contact local authorities to file a cybercrime complaint. You can also seek legal advice to understand your rights." },
    { question: "How can I access free legal aid? ", answer: "Many NGOs, government legal aid cells, and bar associations provide free legal assistance to those who cannot afford representation. Visit your local legal aid office or contact helplines for more information." },
    { question: "How can I understand my legal rights if I am facing discrimination? ", answer: "You have the right to equality and protection under the law. Consult with a lawyer or approach an NGO that focuses on human rights and legal aid for assistance and guidance." },
    { question: "What are my rights when it comes to personal safety in public spaces? ", answer: "Everyone has the right to feel safe in public. You can report any form of harassment to the police, and various NGOs provide support in such situations. Law enforcement agencies are there to protect and uphold your rights." },
    { question: "What should I do if I am sexually assaulted?", answer: " Immediately seek medical help, preserve any evidence, and report the incident to the police. Various organizations also offer counseling and support services." },
    { question: "How can a child seek help if forced into labor?", answer: " If a child is being forced to work, they should reach out to a trusted adult, a teacher, or call Childline 1098 for immediate help. The Child Labour (Prohibition and Regulation) Act, 1986, and the UN Convention on the Rights of the Child (Article 32) strictly prohibit child labor, ensuring legal action against offenders and rehabilitation for affected children." },
    { question: "How can I ensure my personal safety in public spaces?", answer: " Always stay aware of your surroundings and avoid isolated areas, especially at night. Carry a safety tool like a whistle or pepper spray, and inform someone of your whereabouts. If you feel unsafe, seek help from nearby security personnel or call emergency services. Legal provisions such as the IPC Section 354 (India) protect against harassment, and reporting incidents immediately can help prevent further harm." },
    { question: "How can children be educated about personal safety?", answer: " Teach children about safe and unsafe touch, encourage them to speak up if they feel uncomfortable, and establish open communication so they feel safe discussing concerns. Schools should conduct awareness sessions under the guidelines of the Protection of Children from Sexual Offences (POCSO) Act. Child helplines, such as 1098 in India, provide immediate assistance." },
    { question: "How can I build resilience and improve my mental well-being?", answer: "Practice self-care routines, such as mindfulness, regular exercise, and maintaining social connections. Develop coping mechanisms for stress by engaging in positive activities. Seeking therapy or counseling can also help build emotional resilience. The WHO promotes mental health as a key component of overall well-being." },
    { question: "How can I support a friend who is struggling with mental health issues?", answer: "Encourage them to seek professional help from a counselor or psychologist. Offer emotional support and direct them to mental health hotlines or local services for professional guidance." },
    { question: "How can I maintain my digital safety and avoid cyber threats?", answer: "Use strong passwords, enable two-factor authentication, and avoid sharing personal details online. Regularly update privacy settings on social media and be cautious of phishing scams. If you suspect cyber threats, report them to the cybercrime portal. The IT Act, 2000, protects against online fraud and identity theft." },
    { question: "How can children stay safe when alone at home?", answer: "Children should never open the door for strangers and avoid sharing that they are alone. Keeping emergency contacts handy and having a code word with parents for safety checks can help in case of danger. If they sense trouble, they should call 100 (police) or 1098 (Childline)." },

  ],
};

const tabs = ["legalHelp", "safetyTips", "helplines", "faqs"];

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("legalHelp");
  const [showScroll, setShowScroll] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="header">Resources</div>

      {/* Search Bar */}
      <Container className="search-container">
        <InputGroup className="search-bar mt-3">
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search resources..."
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </InputGroup>
      </Container>

      <div className="resources-container mt-4">
        {/* Sidebar Tabs */}
        <div className="tabs-sidebar">
          {tabs.map((tab) => (
            <div
              key={tab}
              className={`tab-item ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "legalHelp" && "Legal Help"}
              {tab === "safetyTips" && "Safety Tips"}
              {tab === "helplines" && "Helplines"}
              {tab === "faqs" && "FAQs"}
            </div>
          ))}
        </div>

        {/* Content Section */}
        <div className="tab-content-wrapper">
          {/* Legal Help Section */}
          {activeTab === "legalHelp" &&
            resourcesData.legalHelp
              .filter((doc) => doc.name.toLowerCase().includes(searchTerm))
              .map((doc, index) => (
                <Card key={index} className="legalcard">
                  <Card.Body>
                    <Card.Text>{doc.name} - {doc.description}</Card.Text>
                    <Button variant="primary" size="sm" href={doc.url} target="_blank">
                      Click Here
                    </Button>
                  </Card.Body>
                </Card>
              ))}

          {/* Safety Tips Section */}
          {activeTab === "safetyTips" &&
            resourcesData.safetyTips
              .filter((doc) => doc.name.toLowerCase().includes(searchTerm))
              .map((doc, index) => (
                <Card key={index} className="safetycard">
                  <Card.Body>
                    <Card.Text>{doc.name} - {doc.description}</Card.Text>
                    <Button variant="primary" size="sm" href={doc.url} target="_blank">
                      Click Here
                    </Button>
                  </Card.Body>
                </Card>
              ))}

          {/* Helplines Section */}
          {activeTab === "helplines" && (
            <div className="mt-3">
              <Row className="justify-content-center">
                {resourcesData.helplines
                  .filter((helpline) => helpline.name.toLowerCase().includes(searchTerm))
                  .slice(0, 5)
                  .map((helpline, index) => {
                    const { icon: IconComponent, color } = icons[index];
                    return (
                      <Col key={index} xs={6} sm={4} md={2} className="d-flex justify-content-center">
                        <Card className="text-center helpline-card" style={{ borderColor: color }}>
                          <div className="icon-container" style={{ backgroundColor: color }}>
                            <IconComponent className="helpline-icon" />
                          </div>
                          <Card.Body>
                            <Card.Title className="helpline-name" style={{ color: color }}>
                              {helpline.name}
                            </Card.Title>
                            <Card.Text className="helpline-number" style={{ color: color }}>
                              {helpline.number}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })}
              </Row>

              <Row className="justify-content-center mt-5">
                {resourcesData.helplines
                  .filter((helpline) => helpline.name.toLowerCase().includes(searchTerm))
                  .slice(5, 10)
                  .map((helpline, index) => {
                    const { icon: IconComponent, color } = icons[index + 5]; // Shift index for second row
                    return (
                      <Col key={index + 5} xs={6} sm={4} md={2} className="d-flex justify-content-center">
                        <Card className="text-center helpline-card" style={{ borderColor: color }}>
                          <div className="icon-container" style={{ backgroundColor: color }}>
                            <IconComponent className="helpline-icon" />
                          </div>
                          <Card.Body>
                            <Card.Title className="helpline-name" style={{ color: color }}>
                              {helpline.name}
                            </Card.Title>
                            <Card.Text className="helpline-number" style={{ color: color }}>
                              {helpline.number}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })}
              </Row>
            </div>
          )}

          {/* FAQs Section */}
          {activeTab === "faqs" &&
            resourcesData.faqs
              .filter((faq) => faq.question.toLowerCase().includes(searchTerm))
              .map((faq, index) => (
                <Card key={index} className="faq-card">
                  <Card.Body>
                    <Card.Title>{faq.question}</Card.Title>
                    <Card.Text>{faq.answer}</Card.Text>
                  </Card.Body>
                </Card>
              ))}
        </div>
      </div>

      {showScroll && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <FaArrowAltCircleUp />
        </button>
      )}

      {/* Styling */}
      <style jsx>{`
        .header {
          background: #007bff;
          color: white;
          text-align: center;
          padding: 15px;
          font-size: 24px;
          font-weight: bold;
          width: 100%;
        }

        .search-container {
          height: 30px;
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }

        .search-bar {
          width: 50%;
        }

        .resources-container {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: center;
          padding: 20px;
          background: linear-gradient(to right, #6dd5ed, #2193b0);
          min-height: 100vh;
          gap: 20px;
        }

        .tabs-sidebar {
          display: flex;
          flex-direction: column;
          width: 20%;
          gap: 10px;
          padding: 10px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
        }

        .tab-item {
          padding: 12px 15px;
          background: white;
          border-radius: 5px;
          cursor: pointer;
          text-align: left;
          transition: 0.3s;
        }

        .tab-item:hover {
          background: #28a745;
          color: white;
        }

        .tab-item.active {
          background: #28a745;
          color: white;
          font-weight: bold;
        }

        .tab-content-wrapper {
          flex-grow: 1;
          background: rgba(255, 255, 255, 0.2);
          padding: 20px;
          border-radius: 8px;
          backdrop-filter: blur(10px);
          min-width: 60%;
        }
        .legalcard {
          border: 2px solid #007bff; 
          border-radius: 8px; 
          padding: 15px;
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease,
            background-color 0.3s ease; 
          background-color: #ffffff; 
        }
        .legalcard:hover,  .safetycard:hover {
          background-color: #f9f9f9; 
          transform: scale(1.02);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); 
          border-color: #007bff; 
        }

        .legalcard .card-text {
          color: #333;
          font-size: 16px; 
        }

        .legalcard .btn {
          margin-top: 10px;
          font-size: 14px;
          padding: 8px 15px;
          border-radius: 5px; 
        }

        .safetycard {
          background: white;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 10px;
        }
        .helpline-card {
          border: 2px solid;
          border-radius: 10px;
          width: 200px;
          padding: 15px;
          background-color: #fff;
          position: relative;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease-in-out;
          min-height: 150px;
        }

        .helpline-card:hover {
          transform: scale(1.05);
        }

        .icon-container {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: -25px;
          left: 50%;
          transform: translateX(-50%);
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.15);
        }

        .helpline-icon {
          font-size: 22px;
          color: #fff;
        }

        .helpline-name {
          font-size: 16px;
          font-weight: bold;
          text-align: center;
          white-space: normal;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }

        .helpline-number {
          font-size: 20px;
          font-weight: bold;
          text-align: center;
        }

        .faq-card {
          border: 1px solid #ddd;
          border-radius: 8px; 
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease; 
        }

        .faq-card:hover {
          background-color: #f5f5f5; 
          transform: scale(1.05); 
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1); 
          border-color: #007bff; 
        }

        .faq-card .card-title {
          font-weight: bold;
          color: #333;
        }

        .faq-card .card-text {
          color: #555;
        }

        .scroll-to-top {
          position: fixed;
          bottom: 5px;
          right: 20px;
          background: white;
          color: black;
          border: none;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          cursor: pointer;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: 0.3s;
        }

        .scroll-to-top:hover {
          background: black;
          color: white;
        }

        @media (max-width: 768px) {
          .resources-container {
            flex-direction: column;
            align-items: center;
          }

          .tabs-sidebar {
            flex-direction: row;
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
       </>
  );
};

export default Resources;
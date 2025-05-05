import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Childrenrights from '../Assets/Childrenrights.jpg';
import Womenrights from '../Assets/Womenrights.jpg';

const childrenRightsData = [
        {
            "title": "1. Right to Survival and Development",
            "content": "Every child has the inherent right to life, survival, and overall development. Governments must ensure that children have access to healthcare, adequate nutrition, clean water, and protection from life-threatening situations such as war, neglect, and extreme poverty. This right guarantees that every child has the opportunity to grow up in a safe and nurturing environment that supports their physical, mental, and emotional well-being."
        },
        {
            "title": "2. Right to Protection from Abuse and Neglect",
            "content": "Children must be protected from all forms of violence, abuse, neglect, and exploitation, whether in their homes, schools, or communities. This includes protection from physical, emotional, and sexual abuse, as well as domestic violence. Governments and institutions should enforce strict laws, create reporting mechanisms, and provide rehabilitation programs to help children recover from trauma and ensure their safety."
        },
        {
            "title": "3. Right to Education",
            "content": "Every child has the right to free, compulsory, and quality education. Governments must ensure that schools are accessible, safe, and inclusive, regardless of gender, socioeconomic status, or disability. Education empowers children with knowledge, skills, and critical thinking, helping them secure a better future. Special emphasis should be placed on removing barriers such as child labor, gender discrimination, and poverty that prevent children from attending school."
        },
        {
            "title": "4. Right to Health and Medical Care",
            "content": "Children have the right to access proper healthcare, including vaccinations, medical treatment, and preventive care. Governments should ensure that every child receives essential healthcare services, including maternal care, nutrition programs, and mental health support. Immunization programs must be implemented to prevent diseases, and children should receive proper medical attention regardless of their financial situation."
        },
        {
            "title": "5. Right to Identity",
            "content": "Every child has the right to a legal identity, including a name, nationality, and official birth registration. This ensures their recognition under the law and grants them access to basic services such as education and healthcare. Birth registration is crucial in preventing child trafficking, illegal adoptions, and statelessness, allowing children to fully participate in society and claim their rights."
        },
        {
            "title": "6. Right to Family and Parental Care",
            "content": "Children have the right to be raised in a loving, caring, and stable family environment. Parents or legal guardians play a critical role in ensuring their well-being, education, and moral development. Governments should support families by providing financial assistance, parental education programs, and social services to prevent family breakdowns, neglect, or abandonment."
        },
        {
            "title": "7. Right to Protection from Child Labor",
            "content": "Children must be protected from exploitative labor that endangers their health, education, and overall development. Governments should implement strict labor laws, prohibit hazardous work for children, and ensure that families are financially supported to prevent children from being forced into labor. Education and skill development programs should be prioritized to offer alternatives to child labor."
        },
        {
            "title": "8. Right to Freedom of Expression",
            "content": "Children have the right to freely express their opinions, thoughts, and ideas, as long as they respect the rights of others. Their views should be considered in matters affecting their lives, such as education, family decisions, and legal proceedings. Schools and communities should encourage open discussions where children can voice their concerns and actively participate in decision-making processes."
        },
        {
            "title": "9. Right to Play and Leisure",
            "content": "Children have the right to rest, recreation, and participation in cultural and artistic activities. Play is essential for a child's physical, cognitive, and emotional development. Governments and communities should provide safe and accessible recreational spaces where children can engage in sports, creative activities, and social interactions without fear or restriction."
        },
        {
            "title": "10. Right to Protection from Violence",
            "content": "Children should be safeguarded from all forms of violence, including physical punishment, emotional abuse, and harmful traditional practices. Schools, communities, and governments should implement strict measures to prevent bullying, corporal punishment, and child abuse. Support systems such as counseling, legal aid, and child protection services must be readily available to victims."
        },
        {
            "title": "11. Right to Special Care for Disabled Children",
            "content": "Children with disabilities must receive special care, equal opportunities, and access to education, healthcare, and social services. Society must eliminate barriers that prevent disabled children from participating fully in life, ensuring inclusivity and respect for their rights. Special education programs, assistive technologies, and financial aid should be provided to support them."
        },
        {
            "title": "12. Right to Protection from Discrimination",
            "content": "Children must be treated equally, regardless of their gender, race, religion, disability, or social background. No child should be denied access to education, healthcare, or opportunities due to discrimination. Governments should promote policies and awareness campaigns that foster equality and social inclusion."
        },
        {
            "title": "13. Right to Protection from Child Marriage",
            "content": "Child marriage is a violation of children's rights, depriving them of education, health, and future opportunities. Governments should enforce strict laws prohibiting child marriage, raise awareness, and empower girls with education and economic opportunities to prevent forced early marriages."
        },
        {
            "title": "14. Right to Clean Water and Sanitation",
            "content": "Access to clean drinking water and hygienic sanitation is essential for children's health and development. Governments should ensure that every child has access to safe water sources, proper toilets, and hygiene education to prevent diseases such as diarrhea and malnutrition."
        },
        {
            "title": "15. Right to Protection from Human Trafficking",
            "content": "Children must be safeguarded from trafficking, forced labor, and sexual exploitation. Governments should strengthen border controls, implement victim protection programs, and take strict action against human traffickers. Awareness campaigns should educate communities about the risks of trafficking."
        },
        {
            "title": "16. Right to Protection from Substance Abuse",
            "content": "Children should be shielded from exposure to drugs, alcohol, and other harmful substances. Governments and communities should enforce strict laws on substance control, provide rehabilitation services for affected children, and educate youth about the dangers of substance abuse."
        },
        {
            "title": "17. Right to Legal Protection",
            "content": "Children who come in contact with the law should be treated with dignity and receive fair legal representation. Juvenile justice systems must focus on rehabilitation rather than punishment. Special legal procedures should be in place to protect child victims and witnesses."
        },
        {
            "title": "18. Right to Protection from Bullying",
            "content": "Children have the right to be protected from bullying, whether in schools, online, or within their communities. Governments and schools must implement anti-bullying policies, offer counseling programs, and create a safe environment for children."
        },
        {
            "title": "19. Right to a Safe Environment",
            "content": "Children have the right to live in an environment free from pollution, hazards, and unsafe conditions. Governments must take action to reduce environmental risks and protect children from exposure to harmful chemicals, air pollution, and climate change effects."
        },
        {
            "title": "20. Right to Digital Safety",
            "content": "Children should be protected from online exploitation, cyberbullying, and exposure to harmful digital content. Governments, schools, and parents must work together to ensure a safe digital environment with proper internet regulations and awareness programs."
        },
        {
            "title": "21. Right to Protection from Child Soldiers",
            "content": "Children must be protected from being recruited into armed forces or militant groups. The use of child soldiers is a grave violation of human rights. Governments should implement strict laws, international agreements, and rehabilitation programs to reintegrate former child soldiers into society, providing them with education and psychological support."
        },
        {
            "title": "22. Right to Freedom from Torture and Inhumane Treatment",
            "content": "No child should be subjected to torture, cruel, degrading, or inhumane treatment. This includes protection from physical punishment, solitary confinement, and abuse within institutions. Governments should enforce laws prohibiting all forms of torture against children and ensure that child-friendly justice systems are in place."
        },
        {
            "title": "23. Right to Access to Justice",
            "content": "Children have the right to legal support and fair treatment in any judicial or administrative proceedings. Special child-friendly courts and trained legal professionals should be available to ensure justice for children, whether they are victims, witnesses, or accused individuals in legal cases."
        },
        {
            "title": "24. Right to Refugee Protection",
            "content": "Children fleeing war, violence, or persecution have the right to international protection. Governments and international organizations should provide shelter, education, healthcare, and psychological support to refugee children, ensuring their dignity and safety while seeking asylum."
        },
        {
            "title": "25. Right to Special Protection During Emergencies",
            "content": "In times of natural disasters, armed conflicts, or pandemics, children must be given priority protection. Governments must establish emergency response programs to ensure children's safety, access to food, healthcare, and education, even in crisis situations."
        },
        {
            "title": "26. Right to Rehabilitation and Reintegration",
            "content": "Children who have experienced trauma, abuse, conflict, or criminal activity deserve the right to rehabilitation and reintegration into society. Governments should provide psychological support, skill development programs, and education opportunities to help them recover and build a positive future. Specialized centers should offer counseling and care for children who have been victims of war, exploitation, or natural disasters."
        },
        {
            "title": "27. Right to Freedom of Thought, Conscience, and Religion",
            "content": "Children have the right to practice their religion and beliefs freely, as long as they respect the rights of others. They should not be forced to follow a specific religion or ideology. Governments and institutions must protect children from religious persecution and ensure their right to make personal decisions regarding their faith as they mature."
        },
        {
            "title": "28. Right to Protection from Harmful Traditional Practices",
            "content": "Children must be safeguarded from harmful traditional practices such as female genital mutilation (FGM), forced servitude, and other customs that violate their dignity and health. Governments should work with communities to raise awareness and eliminate harmful cultural practices that endanger children's well-being."
        },
        {
            "title": "29. Right to Access to Information",
            "content": "Children have the right to receive reliable and age-appropriate information about their rights, health, education, and safety. Governments and institutions should ensure access to books, media, and digital platforms that promote knowledge and critical thinking while protecting children from harmful or misleading content."
        },
        {
            "title": "30. Right to Participate in Society and Decision-Making",
            "content": "Children have the right to be heard and participate in discussions and decisions that affect their lives, whether in school, community projects, or governmental policies. Platforms should be created where children can express their opinions, contribute ideas, and influence changes in their communities and national policies."
        }
];

const womenRightsData = [
    {
        "title": "1. Right to Equality",
        "content": "Women have the right to be treated equally in all aspects of life, including education, employment, and legal rights. The Indian Constitution guarantees equality before the law and prohibits discrimination based on gender (Article 14). This right ensures that women are provided with the same opportunities as men in society, fostering gender parity. The government enforces laws to eliminate biases in workplaces, politics, and public life. Equal access to resources and leadership roles empowers women to contribute meaningfully to national development. Achieving true equality requires continuous efforts in policy-making and societal attitudes."
    },
    {
        "title": "2. Right to Freedom from Discrimination",
        "content": "Under Article 15 of the Indian Constitution, women have the right to be free from discrimination based on gender, caste, religion, or place of birth. Discrimination in education, employment, and social services is prohibited to promote inclusivity. Government schemes such as Beti Bachao Beti Padhao focus on eliminating gender-based disparities. Many organizations actively advocate for women's rights to ensure fair treatment in all spheres of life. Legal protections such as the Equal Remuneration Act and workplace inclusion policies aim to eliminate bias. Empowering women through awareness and enforcement of anti-discrimination laws is essential for progress."
    },
    {
        "title": "3. Right to Education",
        "content": "Women have the fundamental right to access quality education, as per the Right to Education Act, 2009. Education is a powerful tool for women's empowerment, leading to greater independence and social mobility. Girls' education is crucial in breaking poverty cycles and promoting gender equality. The government provides scholarships and initiatives to encourage female education in rural and urban areas. Reservation policies and free school programs aim to bridge the gender gap in literacy. Challenges such as societal stereotypes and financial constraints must be addressed to ensure equal educational opportunities for all women."
    },
    {
        "title": "4. Right to Dignity and Decency",
        "content": "Every woman has the right to live with dignity, free from humiliation, violence, and exploitation. This includes protection from sexual objectification, indecent representation, and moral policing. Laws such as the Indecent Representation of Women (Prohibition) Act, 1986, safeguard women's dignity in media and advertising. Women are entitled to be treated respectfully in all social, legal, and professional spaces. Special provisions ensure that female suspects and victims are treated with dignity in legal proceedings. Upholding women's dignity is essential for creating a just and equitable society."
    },
    {
        "title": "5. Right to Protection from Domestic Violence",
        "content": "The Protection of Women from Domestic Violence Act, 2005, ensures that women can seek legal recourse against domestic abuse. Domestic violence includes physical, emotional, sexual, and economic abuse within households. Women facing abuse have the right to protection orders, residence rights, and monetary relief. Government and NGOs provide helplines and shelter homes for victims seeking refuge. Awareness campaigns aim to break the stigma associated with reporting domestic violence. Legal reforms continue to strengthen women's protection and enforcement of their rights within families."
    },
    {
        "title": "6. Right to Protection from Sexual Harassment",
        "content": "Women have the right to be protected from sexual harassment in workplaces, public spaces, and educational institutions. The Sexual Harassment of Women at Workplace (Prevention, Prohibition, and Redressal) Act, 2013, mandates workplaces to establish complaint committees. This law ensures that victims can report harassment without fear of retaliation. Strict penalties exist for offenders to create a safer work environment for women. Public awareness programs and training sessions educate individuals about consent and respectful behavior. Ensuring women's safety from harassment fosters a more inclusive and productive workforce."
    },
    {
        "title": "7. Right to Maternity Benefits",
        "content": "The Maternity Benefit Act, 1961, guarantees pregnant women paid leave, medical care, and job security. Women in the workforce have the right to 26 weeks of paid maternity leave under the amended law. This right ensures that women do not face job loss or financial hardship due to childbirth. Employers are required to provide additional facilities like crèches and flexible working hours for new mothers. Maternity benefits promote the health and well-being of both mothers and infants. Strengthening policies for working mothers supports gender equality in professional spaces."
    },
    {
        "title": "8. Right to Equal Pay",
        "content": "Under the Equal Remuneration Act, 1976, women have the right to receive equal pay for equal work. Wage discrimination based on gender is illegal and punishable by law. Despite legal protections, many women still face pay gaps in different industries. Government and private sectors are urged to ensure pay parity and transparency in salary structures. Women's economic empowerment depends on closing the gender wage gap. Promoting equal pay strengthens workplace morale and fairness."
    },
    {
        "title": "9. Right to Work in a Safe Environment",
        "content": "Women have the right to a workplace free from physical, mental, and sexual harassment. Employers are required to establish a safe working environment, including preventive measures against harassment. The Vishaka Guidelines and POSH Act mandate internal complaint committees in all organizations. Female workers, especially in unorganized sectors, require stronger protections against exploitation. Government initiatives focus on workplace safety training and legal awareness for working women. Ensuring safety at work enhances women's participation in the workforce."
    },
    {
        "title": "10. Right to Property and Inheritance",
        "content": "Women have equal rights to inherit, own, and transfer property under the Hindu Succession Act, 1956. Previously, property rights were biased against women, but amendments now ensure equality. Women can independently acquire, sell, or manage property without male supervision. Equal inheritance rights help women achieve financial security and independence. Legal reforms continue to address challenges in property disputes and enforcement. Ensuring property rights for women promotes economic empowerment and gender justice."
    },
    {
        "title": "11. Right to Political Participation",
        "content": "Women have the right to vote, contest elections, and participate in governance. The reservation of seats in local bodies ensures women's representation in politics. Increased female participation in leadership roles leads to gender-sensitive policymaking. The Women’s Reservation Bill seeks to reserve 33% of seats for women in Parliament and state assemblies. Women's political empowerment is essential for inclusive development. Encouraging women's leadership in politics strengthens democracy."
    },
    {
        "title": "12. Right to Freedom of Expression",
        "content": "Women have the right to freely express their thoughts, beliefs, and opinions. This right allows them to advocate for gender equality, protest injustices, and participate in social movements. Many women still face censorship, societal pressure, and threats when voicing their views. Laws must protect women from online abuse, defamation, and threats to their safety. Encouraging women to speak up fosters an open and progressive society. Media representation of women's voices is essential for balanced narratives."
    },
    {
        "title": "13. Right to Protection from Human Trafficking",
        "content": "Women have the right to be protected from forced labor, prostitution, and human trafficking. The Immoral Traffic (Prevention) Act and other laws criminalize trafficking and provide support for victims. Women and children are the primary targets of trafficking for sexual exploitation and forced labor. Rehabilitation programs focus on restoring dignity and providing employment opportunities for rescued victims. Strengthening border security and law enforcement helps combat human trafficking. Public awareness and community engagement play a crucial role in prevention."
    },
    {
        "title": "14. Right to Freedom from Forced Marriage",
        "content": "Women have the legal right to marry by choice, without coercion from family or society. The Prohibition of Child Marriage Act, 2006, criminalizes forced and underage marriages. Forced marriage violates women's autonomy and often leads to domestic violence and lack of financial independence. Legal frameworks allow women to seek annulment of forced marriages and protection against threats. Several NGOs work to raise awareness and support victims in escaping forced marriages. Strengthening enforcement mechanisms ensures that women's rights to personal freedom are protected."
    },
    {
        "title": "15. Right to Protection from Dowry Harassment",
        "content": "The Dowry Prohibition Act, 1961, makes giving or demanding dowry a punishable offense. Dowry-related violence and harassment remain major concerns in India. Women have the right to report dowry harassment to law enforcement and seek protection. Legal provisions like Section 498A of the IPC provide safeguards against dowry-related cruelty. Awareness campaigns educate society on the dangers of dowry practices. Strengthening legal actions against dowry crimes ensures women's safety and dignity."
    },
    {
        "title": "16. Right to Safe Abortion",
        "content": "Under the Medical Termination of Pregnancy (MTP) Act, women have the right to safe and legal abortion under certain conditions. Access to reproductive healthcare empowers women to make informed choices about their bodies. Restrictions on abortion can lead to unsafe practices, endangering women's lives. Family, social stigma, and lack of medical facilities often restrict women's access to abortion services. Government policies and healthcare programs work to ensure access to safe abortion facilities. Women's reproductive rights are crucial for their health and autonomy."
    },
    {
        "title": "17. Right to Custody of Children",
        "content": "In case of divorce or separation, women have the right to seek custody of their children. Courts prioritize the best interests of the child while granting custody to either parent. The Hindu Minority and Guardianship Act, 1956, recognizes mothers as natural guardians in specific cases. Financial security, emotional well-being, and upbringing concerns are considered in custody battles. Laws ensure that women are not unfairly deprived of their rights as mothers. Strengthening women's legal awareness helps them assert their parental rights."
    },
    {
        "title": "18. Right to Protection in Live-In Relationships",
        "content": "Women in live-in relationships have legal rights against abuse, abandonment, and financial exploitation. The Domestic Violence Act extends protection to women in live-in relationships. Courts have ruled that women in long-term relationships can claim maintenance and legal recognition. Social stigma often discourages women from asserting their rights in such arrangements. Legal clarity on cohabitation rights strengthens women's security in relationships. Protecting women in live-in relationships ensures gender equality in modern society."
    },
    {
        "title": "19. Right to Protection Against Acid Attacks",
        "content": "Acid attacks are a form of gender-based violence, and survivors have legal protection under the IPC Section 326A. Perpetrators face severe punishment, including life imprisonment. Government compensation schemes provide financial aid for medical treatment and rehabilitation of survivors. NGOs play a crucial role in supporting acid attack victims through counseling and employment opportunities. Strict regulations on the sale of acid help prevent such crimes. Public awareness campaigns aim to change societal attitudes and prevent acid violence."
    },
    {
        "title": "20. Right to Internet and Digital Safety",
        "content": "Women have the right to access and use the internet without facing harassment, stalking, or cyberbullying. The Information Technology (IT) Act criminalizes online abuse, including identity theft and cyberstalking. Women can report digital crimes through cybercrime cells and online portals. Many women face threats and defamation online, discouraging their participation in digital spaces. Social media platforms are required to take strict action against online harassment. Digital literacy programs help women use technology safely and effectively."
    },
    {
        "title": "21. Right to Safe Public Spaces",
        "content": "Women have the right to move freely and safely in public places without fear of harassment or violence. Street harassment, stalking, and molestation violate women's freedom and mobility. Initiatives like 'Safe City Projects' and women's safety apps provide security measures. Increased surveillance, proper street lighting, and stricter law enforcement are essential. Community awareness and self-defense training empower women to respond to threats. Gender-sensitive urban planning ensures safer public spaces for women."
    },
    {
        "title": "22. Right to Protection from Honour Crimes",
        "content": "Honour crimes involve violence against women for defying social norms, particularly in marriage and relationships. These crimes are often committed by family members to uphold 'family honor.' Legal provisions, including murder and abetment laws, punish honor killings. Supreme Court rulings strongly condemn honor crimes and advocate for women's autonomy. Support services for victims include helplines and safe shelters. Stronger legal frameworks and societal awareness are needed to end honor-based violence."
    },
    {
        "title": "23. Right to Marital Rape Protection",
        "content": "Marital rape is a form of sexual violence, yet it remains a contested legal issue in India. Women should have the right to refuse non-consensual sex within marriage. Activists and legal experts advocate for criminalizing marital rape to protect women's bodily autonomy. The Justice Verma Committee recommended legal reforms to recognize marital rape as a crime. Social stigma often prevents women from speaking out against spousal sexual violence. Legal recognition of marital rape is crucial for women's rights and safety."
    },
    {
        "title": "24. Right to Protection from Workplace Exploitation",
        "content": "Women have the right to work in an environment free from exploitation, underpayment, and harassment. Labour laws ensure fair wages, regulated working hours, and protection from employer misconduct. Many women in informal sectors lack awareness of their rights and are vulnerable to exploitation. The government enforces strict laws against forced labor and bonded labor. Empowering women through unions and legal support services strengthens workplace protections. Fair employment practices promote economic justice for women."
    },
    {
        "title": "25. Right to Protection from Witch-Hunting",
        "content": "In some rural areas, women are accused of witchcraft and subjected to violence and social exclusion. The Prevention of Witch-Hunting Laws in states like Jharkhand and Assam aim to protect women from such practices. Superstitions and gender discrimination often target widows, elderly women, and marginalized groups. Public awareness and law enforcement are essential in ending witch-hunting practices. Rehabilitation programs help victims reintegrate into society. Addressing deep-rooted cultural beliefs is key to eradicating this inhuman practice."
    },
    {
        "title": "26. Right to Free Legal Aid",
        "content": "Women have the right to access free legal services, especially in cases of domestic violence, divorce, and property disputes. The Legal Services Authorities Act, 1987, mandates free legal assistance for women in need. Many women are unaware of their legal rights and remain vulnerable to injustice. Legal aid centers and women's helplines provide crucial support in accessing justice. NGOs and government agencies conduct legal awareness programs to empower women. Ensuring accessible legal aid helps women fight for their rights effectively."
    },
    {
        "title": "27. Right to Protection from Forced Prostitution",
        "content": "Women have the right to protection from human trafficking and forced prostitution under the Immoral Traffic (Prevention) Act. Victims of trafficking are entitled to rehabilitation and legal support. Many women and young girls are forced into sex work due to economic vulnerability. Strict anti-trafficking measures help prevent such exploitation. Safe shelters and vocational training programs support survivors in rebuilding their lives. Stronger law enforcement and community awareness reduce the risks of trafficking."
    },
    {
        "title": "28. Right to Reproductive Health Services",
        "content": "Women have the right to access healthcare services related to reproductive and maternal health. Government schemes provide free prenatal, postnatal, and child healthcare services. Lack of access to proper medical facilities leads to high maternal mortality rates. Family planning services empower women to make informed choices about childbirth. Awareness campaigns promote reproductive health education. Affordable and quality healthcare is vital for women's well-being."
    },
    {
        "title": "29. Right to Adoption and Guardianship",
        "content": "Women have the right to adopt children and become legal guardians under adoption laws. The Juvenile Justice Act and Hindu Adoption Laws recognize single women’s rights to adopt. Legal adoption ensures children's welfare and women's parental rights. Many societal norms discourage single or unmarried women from adopting. Strengthening adoption policies can provide more opportunities for women to build families."
    },
    {
        "title": "30. Right to Protection from Online Abuse",
        "content": "Cyberbullying, revenge porn, and online harassment violate women's rights. Women can file complaints under the IT Act and IPC for online abuse. Digital literacy helps women navigate and secure online spaces. Social media platforms must take responsibility for preventing online harassment."
    }
];

const LegalRights = () => {
    const [activeSection, setActiveSection] = useState('overview');
    const [selectedRight, setSelectedRight] = useState(null);
  
    const handleRightClick = (index) => {
        setSelectedRight(selectedRight === index ? null : index);
    };
  
    const renderOverview = () => (
            <Container fluid className="mt-4 text-justify" style={{ fontSize: '18px', lineHeight: '1.8' }}>
                <h2 className="text-center font-weight-bold" style={{ color: '#1316d9' }}>Women & Children’s Rights: An Overview</h2>
                <p className="text-justify"><strong>What are Human Rights?</strong><br /></p>
                <p className='hovertext'>Human rights are fundamental rights and freedoms that belong to every individual, regardless of nationality, gender, ethnicity, or religion. They encompass a broad range of civil, political, economic, social, and cultural rights. These rights are essential for the dignity, equality, and security of all people. International human rights law aims to protect individuals from abuses and ensure they live freely without discrimination. The Universal Declaration of Human Rights, adopted by the United Nations, serves as the foundation for these rights and establishes global standards for human dignity.</p>
                <p className="text-justify"><strong>Why Children’s Human Rights?</strong><br /></p>
                <p className='hovertext'> Children’s human rights highlight the need for special protection and care for young individuals due to their vulnerability. Children have specific needs that require protection, including access to education, health care, and safe living conditions. The Convention on the Rights of the Child (CRC) is an international treaty that outlines the civil, political, economic, social, and cultural rights of children. This framework seeks to ensure that all children are given the opportunity to grow up in a safe, nurturing environment, free from abuse, neglect, and exploitation. It also emphasizes the importance of children's participation in matters that affect their lives.</p>
                <p className="text-justify"><strong>Why Women’s Human Rights?</strong><br /></p>
                <p className='hovertext'>Women's human rights focus on ensuring that women are granted equal opportunities and protection under the law. Historically, women have faced systemic discrimination, limiting their access to education, employment, and political participation. Women's human rights advocates have worked tirelessly to address these inequalities, ensuring that women are not only protected from violence but also empowered to exercise their freedoms fully. Legal frameworks such as the Convention on the Elimination of All Forms of Discrimination Against Women (CEDAW) aim to eliminate gender-based discrimination and promote women's autonomy in various spheres of life.</p>     
            </Container>
    );
  
    const renderChildrenRights = () => (
            <Container fluid className="mt-4" style={{ fontSize: '20px' }}>
                <h2 className="text-center font-weight-bold" style={{ color: '#1316d9' }}>
                    Children’s Rights
                </h2>
                <img
                    src={Childrenrights}
                    alt="Children Rights"
                    style={{
                        position: 'absolute',
                        bottom: '20px',
                        top: '70%',
                        right: '50px',
                        padding: '20px 80px',
                        transform: 'translateY(-50%)',
                        height: '100%',
                        borderRadius: '10px',
                    }}
                />
                {childrenRightsData.map((right, index) => (
                    <div key={index}>
                        <div
                            onClick={() => handleRightClick(index)}
                            style={{
                                cursor: 'pointer',
                                color: 'black',
                                fontWeight: 'bold',
                                textDecoration: selectedRight === index ? 'underline' : 'none',
                                fontFamily: 'serif',
                            }}
                        >
                            {right.title}
                        </div>
                        {selectedRight === index && (
                            <div
                                className="p-4 shadow bg-white mt-2 fade-in"
                                style={{
                                    lineHeight: '1.6',
                                    backgroundColor: '#f8f9fa',
                                    fontSize: '18px',
                                    animation: 'fadeIn 1.5s ease-in-out',
                                    border: '3px solid blue',
                                    borderRadius: '15px',
                                    maxWidth: '50rem',
                                    margin: '30px',
                                    textAlign: 'justify',
                                    borderWidth: '5px',
                                    paddingRight: '100px',
                                }}
                            >
                                <h4 style={{ color: '#1316d9', fontWeight: 'bold', marginBottom: '15px' }}>
                                    {right.title}
                                </h4>
                                <p style={{ color: '#333' }}>{right.content}</p>
                            </div>
                        )}
                    </div>
                ))}
            </Container>
    );
  
    const renderWomenRights = () => (
            <Container fluid className="mt-4" style={{ fontSize: '20px' }}>
                <h2 className="text-center font-weight-bold" style={{ color: '#1316d9' }}>Women’s Rights</h2>
                <img
                    src={Womenrights}
                    alt="Women Rights"
                    style={{
                        position: 'absolute',
                        right: '50px',
                        bottom: '20px',
                        top: '75%',
                        padding: '20px 80px',
                        transform: 'translateY(-50%)',
                        height: '100%',
                        borderRadius: '10px',
                    }}
                />
                {womenRightsData.map((right, index) => (
                    <div key={index}>
                        <div
                            onClick={() => handleRightClick(index)}
                            style={{
                                cursor: 'pointer',
                                color: 'black',
                                fontWeight: 'bold',
                                textDecoration: selectedRight === index ? 'underline' : 'none',
                                fontFamily: 'serif',
                            }}
                        >
                            {right.title}
                        </div>
                        {selectedRight === index && (
                            <div
                                className="p-4 shadow bg-white mt-2 fade-in"
                                style={{
                                    lineHeight: '1.6',
                                    backgroundColor: '#f8f9fa',
                                    fontSize: '18px',
                                    animation: 'fadeIn 1.5s ease-in-out',
                                    border: '3px solid blue',
                                    borderRadius: '15px',
                                    maxWidth: '50rem',
                                    margin: '30px',
                                    textAlign: 'justify',
                                    borderWidth: '5px',
                                    paddingRight: '100px',
                                }}
                            >
                                <h4 style={{ color: '#1316d9', fontWeight: 'bold', marginBottom: '15px' }}>
                                    {right.title}
                                </h4>
                                <p style={{ color: '#333' }}>{right.content}</p>
                            </div>
                        )}
                    </div>
                ))}
            </Container>
    );
  
    const styles = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .fade-in {
            animation: fadeIn 1s ease-in-out;
        }
    `;
    if (typeof document !== 'undefined' && !document.getElementById('fade-in-styles')) {
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.id = "fade-in-styles";
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);
    }
  
    const linkStyle = {
        color: "black",
        fontWeight: "bold",
        padding: "10px",
        cursor: "pointer",
        transition: "0.3s",
        textDecoration: "none",
    };
  
    const activeLinkStyle = {
        ...linkStyle,
        color: "#ffffff", 
        backgroundColor: "#007bff",
        borderRadius: "5px",
    };
  
    const hoverStyle = {
        color: "#7009ee",
    };
  
    return (
        <>
            <Navbar expand="lg" style={{ height: '50px' }}>
                <Container>
                    <Navbar.Brand href="/" className="fs-3" style={{ color: "#7009ee", fontWeight: "bold" }}>
                        Legal Rights
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto fs-5 fw-bold">
                            <Nav.Link
                                onClick={() => { setActiveSection("overview"); setSelectedRight(null); }}
                                style={activeSection === "overview" ? activeLinkStyle : linkStyle}
                                onMouseEnter={(e) => (e.target.style.color = hoverStyle.color)}
                                onMouseLeave={(e) =>
                                    (e.target.style.color = activeSection === "overview" ? "#ffffff" : "black")
                                }
                            >
                                Overview
                            </Nav.Link>
                            <Nav.Link
                                onClick={() => { setActiveSection("children-rights"); setSelectedRight(null); }}
                                style={activeSection === "children-rights" ? activeLinkStyle : linkStyle}
                                onMouseEnter={(e) => (e.target.style.color = hoverStyle.color)}
                                onMouseLeave={(e) =>
                                    (e.target.style.color = activeSection === "children-rights" ? "#ffffff" : "black")
                                }
                            >
                                Children Rights
                            </Nav.Link>
                            <Nav.Link
                                onClick={() => { setActiveSection("women-rights"); setSelectedRight(null); }}
                                style={activeSection === "women-rights" ? activeLinkStyle : linkStyle}
                                onMouseEnter={(e) => (e.target.style.color = hoverStyle.color)}
                                onMouseLeave={(e) =>
                                    (e.target.style.color = activeSection === "women-rights" ? "#ffffff" : "black")
                                }
                            >
                                Women Rights
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
  
            {activeSection === "overview" && renderOverview()}
            {activeSection === "children-rights" && renderChildrenRights()}
            {activeSection === "women-rights" && renderWomenRights()}
        </>
    );
};
  
export default LegalRights;
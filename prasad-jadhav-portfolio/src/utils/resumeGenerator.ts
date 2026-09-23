import { jsPDF } from 'jspdf';

export interface ResumeData {
  name: string;
  phone: string;
  email: string;
  github: string;
  linkedin: string;
  summary: string;
  skills: {
    cicd: string;
    cloud: string;
    security: string;
    monitoring: string;
    programming: string;
  };
  education: {
    degree: string;
    period: string;
    college: string;
    location: string;
  };
  internship: {
    role: string;
    company: string;
    period: string;
    bullets: string[];
  };
  projects: {
    title: string;
    stack?: string;
    bullets: string[];
  }[];
  certifications: string[];
}

export const DEFAULT_RESUME_DATA: ResumeData = {
  name: "Prasad Jadhav",
  phone: "9082554518",
  email: "pj344504@gmail.com",
  github: "github.com/prasads-3",
  linkedin: "linkedin.com/in/prasad-jadhav-19a35b413",
  summary: "DevOps and Cloud fresher with hands-on internship in network monitoring, infrastructure automation, and secure network design. Comfortable working with Linux, AWS, Docker, and Kubernetes and have built several personal DevSecOps and Kubernetes projects to learn CI/CD tools like Jenkins, ArgoCD, Trivy, and Terraform. Interested in roles where I can grow into secure CI/CD, monitoring, and deployment work.",
  skills: {
    cicd: "Jenkins, GitHub Actions, ArgoCD, SonarQube, Trivy, Git",
    cloud: "AWS (EC2, S3, VPC, EKS, IAM, Lambda), Kubernetes, Docker, Kustomize, Helm, Terraform",
    security: "SonarQube, Trivy",
    monitoring: "Prometheus, Grafana",
    programming: "Python, JavaScript, Linux (Ubuntu), CCNA Networking Concepts"
  },
  education: {
    degree: "Bachelor of Engineering in Electronics & Telecommunication",
    period: "2022 – 2026",
    college: "MGM College of Engineering, Navi Mumbai",
    location: ""
  },
  internship: {
    role: "Network Infrastructure & OFC Support Intern",
    company: "Central Railway, CSMT Mumbai",
    period: "Jun 2025 – Jul 2025",
    bullets: [
      "Reviewed railway OFC infrastructure and flagged vulnerabilities; suggested upgrades that improved reliability by about 15%",
      "Documented telecom infrastructure procedures and troubleshooting steps for the team",
      "Got hands-on with Linux CLI for network monitoring and supported change management work"
    ]
  },
  projects: [
    {
      title: "EasyShop – DevSecOps & AWS EKS Deployment",
      stack: "Stack: Jenkins, Docker, SonarQube, Trivy, Amazon ECR, Amazon EKS, Kubernetes, AWS ALB, IAM",
      bullets: [
        "Built an end-to-end CI/CD pipeline in Jenkins integrating SonarQube (code quality) and Trivy (vulnerability/secret scanning) for a DevSecOps workflow",
        "Containerized the application with Docker and automated image builds/publishing to a private Amazon ECR repository",
        "Deployed and orchestrated the app on Amazon EKS using Kubernetes Deployments, Services, and Ingress, exposed publicly via AWS Application Load Balancer",
        "Configured Horizontal Pod Autoscaler (HPA) to auto-scale pods (1-10 replicas) based on CPU utilization, and set up dedicated IAM roles for secure AWS access"
      ]
    },
    {
      title: "End-to-End DevSecOps Pipeline (Wanderlust Project)",
      bullets: [
        "Built a CI/CD pipeline with Jenkins, Docker, and Kubernetes for a sample application",
        "Added SonarQube and Trivy scans into the pipeline to catch code and dependency issues early",
        "Used ArgoCD for GitOps-style deployments with rollback support",
        "Set up Prometheus and Grafana for monitoring and alerts",
        "Deployed the complete pipeline on a local Kubernetes cluster and validated end-to-end functionality"
      ]
    }
  ],
  certifications: [
    "Cisco CCNA (200-301) – In Progress (RST Forum, Dadar)"
  ]
};

export const generateResumePDF = (data: ResumeData = DEFAULT_RESUME_DATA): jsPDF => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const leftX = 16;
  const rightX = pageWidth - 16;
  const contentWidth = rightX - leftX;

  let y = 16;

  // Name (centered, bold, 17pt)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(17);
  doc.setTextColor(20, 20, 20);
  doc.text(data.name, pageWidth / 2, y, { align: "center" });

  y += 5.5;

  // Contact Info (centered, 8.5pt)
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(40, 40, 40);
  const contactText = `${data.phone} | ${data.email} | ${data.github} | ${data.linkedin}`;
  doc.text(contactText, pageWidth / 2, y, { align: "center" });

  y += 6;

  // Section Header Helper
  const renderSectionHeader = (title: string) => {
    y += 1.5;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(20, 20, 20);
    doc.text(title, leftX, y);
    y += 1.8;
    doc.setDrawColor(160, 160, 160);
    doc.setLineWidth(0.25);
    doc.line(leftX, y, rightX, y);
    y += 3.5;
  };

  // Helper for bullet items
  const renderBullet = (text: string, indent = 4) => {
    const bulletX = leftX + 1.5;
    const textX = leftX + indent;
    const maxTextWidth = contentWidth - indent;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(30, 30, 30);
    
    // Draw small bullet point
    doc.text("●", bulletX, y);

    const lines = doc.splitTextToSize(text, maxTextWidth);
    doc.text(lines, textX, y);
    y += lines.length * 3.7 + 0.8;
  };

  // 1. PROFILE SUMMARY
  renderSectionHeader("PROFILE SUMMARY");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(30, 30, 30);
  const summaryLines = doc.splitTextToSize(data.summary, contentWidth);
  doc.text(summaryLines, leftX, y, { maxWidth: contentWidth, align: "justify" });
  y += summaryLines.length * 3.7 + 2;

  // 2. TECHNICAL SKILLS
  renderSectionHeader("TECHNICAL SKILLS");
  const skillsList = [
    { label: "CI/CD & Automation", val: data.skills.cicd },
    { label: "Cloud & Infrastructure", val: data.skills.cloud },
    { label: "Security & DevSecOps", val: data.skills.security },
    { label: "Monitoring & Observability", val: data.skills.monitoring },
    { label: "Programming & OS", val: data.skills.programming }
  ];

  skillsList.forEach(item => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(20, 20, 20);
    const labelText = `${item.label}: `;
    doc.text(labelText, leftX, y);
    
    const labelWidth = doc.getTextWidth(labelText);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(30, 30, 30);
    const valLines = doc.splitTextToSize(item.val, contentWidth - labelWidth);
    
    if (valLines.length > 0) {
      doc.text(valLines[0], leftX + labelWidth, y);
      for (let i = 1; i < valLines.length; i++) {
        y += 3.6;
        doc.text(valLines[i], leftX + labelWidth, y);
      }
    }
    y += 3.8;
  });
  y += 1;

  // 3. EDUCATION
  renderSectionHeader("EDUCATION");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.8);
  doc.setTextColor(20, 20, 20);
  doc.text(data.education.degree, leftX, y);
  doc.text(data.education.period, rightX, y, { align: "right" });
  y += 3.8;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(40, 40, 40);
  doc.text(data.education.college, leftX, y);
  doc.text(data.education.location, rightX, y, { align: "right" });
  y += 4.5;

  // 4. INTERNSHIP EXPERIENCE
  renderSectionHeader("INTERNSHIP EXPERIENCE");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.8);
  doc.setTextColor(20, 20, 20);
  const internHeader = `${data.internship.role} | ${data.internship.company}`;
  doc.text(internHeader, leftX, y);
  doc.setFont("helvetica", "normal");
  doc.text(data.internship.period, rightX, y, { align: "right" });
  y += 4;

  data.internship.bullets.forEach(bullet => {
    renderBullet(bullet);
  });
  y += 1;

  // 5. HANDS-ON PROJECTS
  renderSectionHeader("HANDS-ON PROJECTS");
  data.projects.forEach((proj, index) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.8);
    doc.setTextColor(20, 20, 20);
    doc.text(proj.title, leftX, y);
    y += 3.6;

    if (proj.stack) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(60, 60, 60);
      doc.text(proj.stack, leftX, y);
      y += 3.6;
    }

    proj.bullets.forEach(bullet => {
      renderBullet(bullet);
    });

    if (index < data.projects.length - 1) {
      y += 1.5;
    }
  });

  // 6. CERTIFICATIONS & TRAINING
  renderSectionHeader("CERTIFICATIONS & TRAINING");
  data.certifications.forEach(cert => {
    renderBullet(cert);
  });

  return doc;
};

export const downloadResumePDF = async (data: ResumeData = DEFAULT_RESUME_DATA): Promise<boolean> => {
  const directUrls = [
    './resume.pdf',
    '/resume.pdf',
    'https://drive.google.com/uc?export=download&id=1dK1153yX5qELEXYZZ3JDyd1e-fFdjFdI'
  ];

  for (const url of directUrls) {
    try {
      const res = await fetch(url, { mode: 'cors' });
      if (res.ok) {
        const blob = await res.blob();
        if (blob.size > 1000) { // Valid PDF size check
          const blobUrl = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = 'Prasad_Jadhav_Resume.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setTimeout(() => window.URL.revokeObjectURL(blobUrl), 2000);
          return true;
        }
      }
    } catch {
      // Continue to next fallback
    }
  }

  // 2. Direct anchor click fallback for absolute drive file download
  try {
    const link = document.createElement('a');
    link.href = './resume.pdf';
    link.download = 'Prasad_Jadhav_Resume.pdf';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch (err) {
    console.warn("Direct link trigger failed, generating dynamic fallback:", err);
  }

  // 3. Client-side instant generator fallback
  try {
    const doc = generateResumePDF(data);
    doc.save("Prasad_Jadhav_Resume.pdf");
    return true;
  } catch (err) {
    console.error("Failed to generate PDF", err);
    window.print();
    return false;
  }
};

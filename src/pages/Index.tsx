import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CVHeader } from "@/components/CVHeader";
import { CVExperience } from "@/components/CVExperience";
import { CVEducation } from "@/components/CVEducation";
import { CVSkills } from "@/components/CVSkills";
import { CVInterests } from "@/components/CVInterests";
import { Navigation } from "@/components/Navigation";
import { toast } from "sonner";
import html2pdf from "html2pdf.js";
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx";
import { saveAs } from "file-saver";

const Index = () => {
  const cvData = {
    name: "Daniel\nRodrigues",
    title: "Designer Gráfico",
    birthDate: "31/05/1998",
    phone: "+55 19 99221-1226 ou +55 19 98228-6045",
    email: "danielrodriguis@live.com",
    linkedin: "www.linkedin.com/in/danfotoos",
    portfolio: "https://danfotoos.46graus.com",
    projects: "https://clipstudium.shop/",
    address: "R. Ema Frederici Geraldeli, 790 - Jardim Rosolem, Hortolândia - SP, 13185-310",
    experiences: [
      {
        period: "Out/2021 –\nJul/2025",
        role: "Coordenador Administrativo",
        company: "Gerente Administrativo — Eshops (Empresa credenciada da Heineken)",
        description: "Gestão administrativa e operacional da unidade, RH, administração, folha de ponto e escalas; coordenação de equipe e supervisão de processos internos, garantir cumprimento das metas e objetivos estabelecidos.",
      },
      {
        period: "Jan/2017 –\nDez/2021",
        role: "Colaborador de Fast Food",
        company: "Habib's",
        description: "Atendimento ao público com qualidade; operações de caixa e gestão de estoque; colaboração em equipe para alcançar os objetivos da loja.",
      },
    ],
    education: [
      {
        year: "2017",
        degree: "Ensino Médio Completo",
        details: "Concluído em 2017",
      },
      {
        year: "2021",
        degree: "Curso de Fotografia — Adobe Photoshop",
        details: "Instituição: Entre Olhares - Duração: 40 horas - Concluído em 2021",
      },
      {
        year: "2025",
        degree: "Curso de Soldagem",
        details: "Soldagem a Arco Elétrico com Eletrodo Revestido",
      },
    ],
    skills: [
      { name: "Adobe Photoshop", level: 85 },
      { name: "desenvolvimento de site", level: 40 },
      { name: "Edição de vídeos", level: 60 },
      { name: "Concepção Design", level: 80 },
    ],
    interests: [
      "Trabalho youtube Canal Dark de IA",
      "Línguas Estrangeiras espanhol basico",
      "Redes Sociais",
      "Fotografia",
      "Video Maker",
      "Pacote Office",
    ],
  };

  const handleDownloadPDF = async (withColors = true) => {
    const element = document.getElementById("cv-content");
    if (!element) return;

    toast.loading("Gerando PDF...");

    // Se for sem cores, adiciona classe temporária
    if (!withColors) {
      element.classList.add("print-no-color");
    }

    const opt = {
      margin: 0,
      filename: withColors 
        ? "curriculo-daniel-rodrigues.pdf" 
        : "curriculo-daniel-rodrigues-sem-cores.pdf",
      image: { type: "jpeg" as const, quality: 0.98 },
      html2canvas: { 
        scale: 2.5, 
        useCORS: true, 
        letterRendering: true,
        allowTaint: true,
        backgroundColor: withColors ? null : '#ffffff',
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        x: 0,
        y: 0,
        scrollX: 0,
        scrollY: -window.scrollY
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" as const },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    try {
      await html2pdf().set(opt).from(element).save();
      toast.success("PDF baixado com sucesso!");
    } catch (error) {
      toast.error("Erro ao gerar PDF");
      console.error(error);
    } finally {
      // Remove a classe temporária
      if (!withColors) {
        element.classList.remove("print-no-color");
      }
    }
  };

  const handleDownloadWord = async () => {
    toast.loading("Gerando documento Word...");

    try {
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                text: cvData.name.replace('\\n', ' '),
                heading: HeadingLevel.HEADING_1,
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: cvData.title,
                alignment: AlignmentType.CENTER,
                spacing: { after: 200 },
              }),
              new Paragraph({
                text: cvData.birthDate,
                alignment: AlignmentType.CENTER,
                spacing: { after: 200 },
              }),
              new Paragraph({
                text: cvData.address,
                alignment: AlignmentType.CENTER,
                spacing: { after: 100 },
              }),
              new Paragraph({
                text: `Telefone: ${cvData.phone}`,
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: `E-mail: ${cvData.email}`,
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: `LinkedIn: ${cvData.linkedin}`,
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: `Portfólio: ${cvData.portfolio}`,
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: `Projetos: ${cvData.projects}`,
                alignment: AlignmentType.CENTER,
                spacing: { after: 400 },
              }),
              new Paragraph({
                text: "EXPERIÊNCIA",
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 400, after: 200 },
              }),
              ...cvData.experiences.flatMap((exp) => [
                new Paragraph({
                  children: [
                    new TextRun({ text: `${exp.period.replace('\\n', ' ')}  `, bold: true }),
                    new TextRun({ text: `${exp.role} — ${exp.company}`, bold: true }),
                  ],
                  spacing: { after: 100 },
                }),
                new Paragraph({
                  text: exp.description,
                  spacing: { after: 200 },
                }),
              ]),
              new Paragraph({
                text: "FORMAÇÃO ACADÊMICA",
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 400, after: 200 },
              }),
              ...cvData.education.flatMap((edu) => [
                new Paragraph({
                  children: [
                    new TextRun({ text: `${edu.year}  `, bold: true }),
                    new TextRun({ text: edu.degree, bold: true }),
                  ],
                  spacing: { after: 100 },
                }),
                new Paragraph({
                  text: edu.details,
                  spacing: { after: 200 },
                }),
              ]),
              new Paragraph({
                text: "HABILIDADES",
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 400, after: 200 },
              }),
              ...cvData.skills.map(
                (skill) =>
                  new Paragraph({
                    text: `${skill.name}: ${skill.level}%`,
                    spacing: { after: 100 },
                  })
              ),
              new Paragraph({
                text: "INTERESSES",
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 400, after: 200 },
              }),
              ...cvData.interests.map(
                (interest) =>
                  new Paragraph({
                    text: `• ${interest}`,
                    spacing: { after: 100 },
                  })
              ),
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, "curriculo-daniel-rodrigues.docx");
      toast.success("Documento Word baixado com sucesso!");
    } catch (error) {
      toast.error("Erro ao gerar documento Word");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-cv-gradient flex items-center justify-center p-3 sm:p-6 md:p-8">
      <Navigation />
      <div className="w-full max-w-5xl">
        {/* Download Buttons */}
        <div className="flex flex-col sm:flex-row justify-center sm:justify-end gap-2 sm:gap-3 mb-4 sm:mb-6">
          <Button
            onClick={() => handleDownloadPDF(false)}
            variant="outline"
            className="font-semibold px-4 sm:px-6 py-4 sm:py-6 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 text-sm sm:text-base w-full sm:w-auto"
          >
            <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            PDF Sem Cores
          </Button>
          <Button
            onClick={() => handleDownloadPDF(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-4 sm:px-6 py-4 sm:py-6 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 text-sm sm:text-base w-full sm:w-auto"
          >
            <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Baixar PDF
          </Button>
          <Button
            onClick={handleDownloadWord}
            variant="secondary"
            className="font-semibold px-4 sm:px-6 py-4 sm:py-6 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 text-sm sm:text-base w-full sm:w-auto"
          >
            <FileText className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Baixar Word
          </Button>
        </div>

        {/* CV Content */}
        <div
          id="cv-content"
          className="bg-cv-gradient p-8 sm:p-10 md:p-12 rounded-lg shadow-2xl max-w-[210mm] min-h-[297mm] mx-auto"
        >
          <CVHeader
            name={cvData.name}
            title={cvData.title}
            birthDate={cvData.birthDate}
            phone={cvData.phone}
            email={cvData.email}
            linkedin={cvData.linkedin}
            portfolio={cvData.portfolio}
            projects={cvData.projects}
            address={cvData.address}
          />

          <CVExperience experiences={cvData.experiences} />

          <CVEducation education={cvData.education} />

          {/* Two Column Layout for Skills and Interests */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <CVSkills skills={cvData.skills} />
            <CVInterests interests={cvData.interests} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

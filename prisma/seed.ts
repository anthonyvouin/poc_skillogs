const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.question.deleteMany()
  await prisma.configuration.deleteMany()

  await prisma.configuration.create({
    data: {
      email_rh: "rh@entreprise.fr",
      telephone_rh: "01 23 45 67 89",
      reponse_defaut: "Je ne peux pas répondre à cette question. Veuillez contacter le service RH par email : rh@entreprise.fr ou par téléphone : 01 23 45 67 89"
    }
  })

  await prisma.question.createMany({
    data: [
      {
        categorie: "paie",
        question: "Quand est versé le salaire ?",
        reponse: "Les salaires sont versés le 25 de chaque mois. Si cette date tombe un weekend, le versement est effectué le jour ouvré précédent.",
        mots_cles: ["quand", "date", "versement", "salaire", "paye", "versé"],
        actif: true
      },
      {
        categorie: "paie",
        question: "Comment obtenir une attestation de salaire ?",
        reponse: "Pour obtenir une attestation de salaire, faites la demande via votre espace RH rubrique 'Mes documents' > 'Demande d'attestation'",
        mots_cles: ["attestation", "document", "certificat", "obtenir"],
        actif: true
      },
      {
        categorie: "processus_internes",
        question: "Quelle est la procédure en cas d'arrêt maladie ?",
        reponse: "En cas d'arrêt maladie : 1) Informez votre manager 2) Envoyez votre arrêt de travail sous 48h au service RH 3) Tenez-nous informés de la durée",
        mots_cles: ["maladie", "arrêt", "absence", "procédure", "malade"],
        actif: true
      }
    ]
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
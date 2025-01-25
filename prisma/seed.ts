const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()

async function main() {
  await prisma.question.deleteMany()
  await prisma.configuration.deleteMany()
  await prisma.user.deleteMany()

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash('passwordadmin', salt)

  await prisma.user.create({
    data: {
      email: "admin@imparare.fr",
      password: hashedPassword,
      nom: "Admin Imparare",
      createdAt: new Date()
    }
  })

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
        categorie: "processus_internes",
        question: "Quelle est la procédure en cas d'arrêt maladie ?",
        reponse: "En cas d'arrêt maladie : 1) Informez votre manager 2) Envoyez votre arrêt de travail sous 48h au service RH 3) Tenez-nous informés de la durée",
        mots_cles: ["maladie", "arrêt", "absence", "procédure", "malade"],
        actif: true
      },
      {
        categorie: "paie",
        question: "Comment obtenir une attestation de salaire ?",
        reponse: "Pour obtenir une attestation de salaire, faites la demande via votre espace RH rubrique 'Mes documents' > 'Demande d'attestation'",
        mots_cles: ["attestation", "salaire", "document", "certificat"],
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
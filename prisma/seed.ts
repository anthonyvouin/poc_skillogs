const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.question.deleteMany()
  await prisma.configuration.deleteMany()

  await prisma.configuration.create({
    data: {
      email_rh: "rh@entreprise.fr",
      telephone_rh: "01 23 45 67 89",
      reponse_defaut: "Je ne peux pas répondre à cette question. Veuillez contacter le service RH."
    }
  })

  await prisma.question.createMany({
    data: [
      {
        categorie: "conges",
        question: "Combien de jours de congé me reste-t-il ?",
        reponse: "Pour connaître votre solde de congés, connectez-vous à votre espace RH rubrique 'Mes congés'.",
        mots_cles: ["congé", "solde", "reste", "jours"],
        actif: true
      },
      {
        categorie: "conges",
        question: "Comment poser des congés ?",
        reponse: "Pour poser des congés : 1) Connectez-vous à votre espace RH 2) Cliquez sur 'Demande de congés' 3) Sélectionnez vos dates 4) Validez la demande",
        mots_cles: ["congé", "poser", "demande", "comment"],
        actif: true
      },
      {
        categorie: "paie",
        question: "Quand sera versé mon prochain salaire ?",
        reponse: "Les salaires sont versés le 25 de chaque mois. Si cette date tombe un weekend, le versement est effectué le jour ouvré précédent.",
        mots_cles: ["salaire", "paie", "versement", "quand"],
        actif: true
      },
      {
        categorie: "paie",
        question: "Comment accéder à mes bulletins de paie ?",
        reponse: "Vos bulletins de paie sont disponibles dans votre espace RH, rubrique 'Mes documents' > 'Bulletins de paie'.",
        mots_cles: ["bulletin", "paie", "fiche", "salaire"],
        actif: true
      },
      {
        categorie: "processus_internes",
        question: "Comment faire une demande de télétravail ?",
        reponse: "Pour faire une demande de télétravail : 1) Espace RH > 'Mes demandes' > 'Télétravail' 2) Remplissez le formulaire 3) Votre manager recevra une notification pour validation",
        mots_cles: ["télétravail", "demande", "remote", "distance"],
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
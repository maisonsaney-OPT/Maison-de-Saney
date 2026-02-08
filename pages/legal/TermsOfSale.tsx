import React from 'react';

export const TermsOfSale: React.FC = () => {
  return (
    <div className="pt-24 pb-12 px-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-serif font-bold text-saney-dark mb-8">Conditions Générales de Vente (CGV)</h1>
      
      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">1. Objet</h2>
          <p>
            Les présentes conditions générales de vente régissent les relations contractuelles entre Maison de Saney et son client, 
            les deux parties les acceptant sans réserve. Ces conditions générales de vente prévaudront sur toutes autres conditions 
            figurant dans tout autre document, sauf dérogation préalable, expresse et écrite.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">2. Produits et Services</h2>
          <p>
            Les produits et services offerts sont ceux qui figurent dans le catalogue publié sur le site de Maison de Saney. 
            Ces produits et services sont offerts dans la limite des stocks disponibles. 
            Chaque produit est accompagné d'un descriptif établi par le fournisseur.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">3. Tarifs</h2>
          <p>
            Les prix figurant dans le catalogue sont des prix TTC en euro tenant compte de la TVA applicable au jour de la commande; 
            tout changement du taux pourra être répercuté sur le prix des produits ou des services. 
            Maison de Saney se réserve le droit de modifier ses prix à tout moment, étant toutefois entendu que le prix figurant 
            au catalogue le jour de la commande sera le seul applicable à l'acheteur.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">4. Commandes</h2>
          <p>
            L'acheteur, qui souhaite acheter un produit ou un service doit obligatoirement :
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Remplir la fiche d'identification sur laquelle il indiquera toutes les coordonnées demandées ou donner son numéro de client s'il en a un;</li>
            <li>Remplir le bon de commande en ligne en donnant toutes les références des produits ou services choisis;</li>
            <li>Valider sa commande après l'avoir vérifiée;</li>
            <li>Effectuer le paiement dans les conditions prévues;</li>
            <li>Confirmer sa commande et son règlement.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">5. Rétractation</h2>
          <p>
            Les acheteurs, personnes physiques non professionnelles, bénéficient d'un délai de rétractation de quatorze jours 
            à compter de la livraison de leur commande pour faire retour du produit au vendeur pour échange ou remboursement sans pénalité, 
            à l'exception des frais de retour.
          </p>
        </section>
      </div>
    </div>
  );
};

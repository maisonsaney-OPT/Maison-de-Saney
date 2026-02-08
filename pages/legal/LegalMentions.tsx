import React from 'react';

export const LegalMentions: React.FC = () => {
  return (
    <div className="pt-24 pb-12 px-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-serif font-bold text-saney-dark mb-8">Mentions Légales</h1>
      
      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">1. Éditeur du site</h2>
          <p>
            Le site Maison de Saney est édité par [Nom de l'entreprise ou du propriétaire], 
            [Forme juridique : SAS, SARL, Auto-entrepreneur...], au capital de [Montant] €, 
            immatriculée au Registre du Commerce et des Sociétés de [Ville] sous le numéro [Numéro SIRET].
          </p>
          <p className="mt-2">
            Siège social : [Adresse complète]<br />
            Email : contact@maisondesaney.com<br />
            Téléphone : [Numéro de téléphone]
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">2. Directeur de la publication</h2>
          <p>Le directeur de la publication est [Nom du directeur], en qualité de [Titre].</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">3. Hébergement</h2>
          <p>
            Le site est hébergé par [Nom de l'hébergeur], 
            [Adresse de l'hébergeur], 
            [Téléphone de l'hébergeur].
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">4. Propriété intellectuelle</h2>
          <p>
            L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. 
            Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
          </p>
        </section>
      </div>
    </div>
  );
};

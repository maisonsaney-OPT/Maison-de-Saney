import React, { useState } from 'react';
import { APP_NAME } from '../constants';
import { useData } from '../context/DataContext';
import img2 from '../src/2.png';
import img3 from '../src/3.png';
import img6 from '../src/6.png';
import img10 from '../src/10.png';
import img11 from '../src/11.png';
import img16 from '../src/16.png';
import nails from '../src/nails.png';
import bg15 from '../src/15.png';

export const FormationsPage: React.FC = () => {
  const { formations, addQuestionnaireAnswer } = useData();
  const [selectedFormationId, setSelectedFormationId] = useState<string>('');
  const heroImages = [img2, img3, img6, img11, img10, img16, nails];
  // Infinite scroll animation logic is handled via CSS
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    date: '',
    motivation: '',
    hasExperience: 'non',
    experienceDetails: '',
    expectations: '',
    learningPreference: '',
    learningPreferenceReason: '',
    techniques: [] as string[],
    otherTechnique: '',
    futureProject: [] as string[],
    futureProjectDetails: '',
    trainingTime: '',
    qualities: '',
    fears: '',
    shortTermGoals: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'techniques' | 'futureProject') => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const current = prev[field];
      if (checked) {
        return { ...prev, [field]: [...current, value] };
      } else {
        return { ...prev, [field]: current.filter(item => item !== value) };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create answer record for generic answers (string)
    const answersRecord: Record<string, string> = {
      motivation: formData.motivation,
      hasExperience: formData.hasExperience === 'oui' ? `Oui (${formData.experienceDetails})` : 'Non',
      expectations: formData.expectations,
      learningPreference: `${formData.learningPreference} (${formData.learningPreferenceReason})`,
      techniques: [...formData.techniques, formData.otherTechnique].filter(Boolean).join(', '),
      futureProject: [...formData.futureProject, formData.futureProjectDetails].filter(Boolean).join(', '),
      trainingTime: formData.trainingTime,
      qualities: formData.qualities,
      fears: formData.fears,
      shortTermGoals: formData.shortTermGoals
    };

    addQuestionnaireAnswer({
      id: Math.random().toString(36).substr(2, 9),
      formationId: selectedFormationId || 'general',
      userName: formData.fullName,
      userEmail: formData.email,
      answers: answersRecord,
      submittedAt: new Date().toISOString()
    });

    alert('Merci pour votre réponse ! Nous vous contacterons bientôt.');
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      date: '',
      motivation: '',
      hasExperience: 'non',
      experienceDetails: '',
      expectations: '',
      learningPreference: '',
      learningPreferenceReason: '',
      techniques: [],
      otherTechnique: '',
      futureProject: [],
      futureProjectDetails: '',
      trainingTime: '',
      qualities: '',
      fears: '',
      shortTermGoals: ''
    });
  };

  return (
    <div className="pt-24 pb-16 bg-saney-cream min-h-screen">
      <div className="w-full mb-16 overflow-hidden relative">
        <div className="relative w-full">
          {/* Infinite Scroll Container */}
          <div className="flex w-full group">
            <div className="flex animate-scroll whitespace-nowrap">
              {[...heroImages, ...heroImages].map((src, idx) => (
                <div key={idx} className="flex-shrink-0 w-[40vh] h-[40vh] md:w-[60vh] md:h-[60vh] relative animate-zoom-pulse origin-center">
                  <img
                    src={src}
                    alt={`Formation ${idx}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="flex animate-scroll whitespace-nowrap" aria-hidden="true">
              {[...heroImages, ...heroImages].map((src, idx) => (
                <div key={`dup-${idx}`} className="flex-shrink-0 w-[40vh] h-[40vh] md:w-[60vh] md:h-[60vh] relative animate-zoom-pulse origin-center">
                  <img
                    src={src}
                    alt={`Formation ${idx}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scrolling Tape Overlay */}
        <div className="absolute bottom-0 left-0 w-full bg-saney-dark/95 border-t border-saney-gold/20 backdrop-blur-sm z-30 py-3 overflow-hidden">
          <div className="flex animate-scroll-slow whitespace-nowrap">
            {[...Array(20)].map((_, i) => (
              <span key={i} className="mx-8 text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-saney-gold/90 flex items-center gap-8">
                EXPERTISE PARFAITE <span className="text-white/50">•</span>
                FORMATION D'EXCELLENCE <span className="text-white/50">•</span>
                EXPERTS ONGLES <span className="text-white/50">•</span>
                EXPERTS SOINS <span className="text-white/50">•</span>
                MAÎTRISE TECHNIQUE <span className="text-white/50">•</span>
                ART & PASSION <span className="text-white/50">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header / Intro */}
        <div className="text-center mb-16 space-y-6">
          <h1 className="font-serif text-4xl md:text-5xl text-saney-dark">Formations {APP_NAME}</h1>
          <div className="w-24 h-1 bg-saney-gold mx-auto"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Bienvenue chez {APP_NAME}. Forts de notre expertise et de notre passion pour l'onglerie, 
            nous avons conçu des formations exclusives pour vous transmettre nos techniques signature. 
            Que vous soyez débutante ou confirmée, ce questionnaire nous permettra de mieux comprendre 
            vos attentes et de vous proposer un parcours adapté.
          </p>
        </div>

        {/* Available Formations List */}
        {formations.length > 0 && (
          <div className="mb-16">
            <h2 className="font-serif text-2xl text-center mb-8 uppercase tracking-widest text-saney-dark">Nos Modules de Formation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formations.map(formation => (
                <div key={formation.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      {formation.image && <img src={formation.image} alt={formation.title} className="w-full h-full object-cover" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{formation.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">{formation.duration} • {formation.price} €</p>
                      <p className="text-sm text-gray-600 line-clamp-2">{formation.description}</p>
                      <button 
                        onClick={() => setSelectedFormationId(formation.id)}
                        className={`mt-3 text-sm font-bold ${selectedFormationId === formation.id ? 'text-saney-gold' : 'text-saney-dark hover:text-saney-gold'}`}
                      >
                        {selectedFormationId === formation.id ? 'Sélectionné ✓' : 'Choisir cette formation'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Questionnaire Form */}
        <div
          className="rounded-2xl shadow-xl p-8 md:p-12"
          style={{
            backgroundImage: `url(${bg15})`,
            backgroundRepeat: 'repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'center top'
          }}
        >
          <h2 className="font-serif text-2xl text-center mb-2 uppercase tracking-widest text-saney-dark">Questionnaire de pré-inscription</h2>
          <p className="text-center text-gray-500 mb-10 uppercase text-sm tracking-wider">
            {selectedFormationId 
              ? `Candidature pour : ${formations.find(f => f.id === selectedFormationId)?.title}` 
              : "Candidature Spontanée"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* Identity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/50 backdrop-blur-sm rounded-xl p-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold uppercase tracking-wide text-gray-700">Nom et Prénom</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full border-b border-gray-300 focus:border-saney-gold outline-none py-2 bg-white/70 backdrop-blur-sm transition-colors"
                  placeholder="Votre réponse"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold uppercase tracking-wide text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border-b border-gray-300 focus:border-saney-gold outline-none py-2 bg-white/70 backdrop-blur-sm transition-colors"
                  placeholder="votre@email.com"
                  required
                />
              </div>
            </div>

            {/* Q1 */}
            <div className="space-y-3 bg-white/50 backdrop-blur-sm rounded-xl p-6">
              <label className="block font-medium text-gray-800">1. Pourquoi souhaitez-vous suivre une formation d'onglerie ?</label>
              <textarea
                name="motivation"
                value={formData.motivation}
                onChange={handleInputChange}
                className="w-full p-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-saney-gold outline-none"
                rows={3}
              />
            </div>

            {/* Q2 */}
            <div className="space-y-3 bg-white/50 backdrop-blur-sm rounded-xl p-6">
              <label className="block font-medium text-gray-800">2. Avez-vous déjà une expérience dans l'esthétique ou l'onglerie ?</label>
              <div className="flex gap-4">
                {['oui', 'non'].map((option) => (
                  <label 
                    key={option} 
                    className={`flex-1 cursor-pointer py-3 px-6 rounded-xl border text-center transition-all duration-300 shadow-sm
                      ${formData.hasExperience === option 
                        ? 'bg-saney-gold border-saney-gold text-white shadow-md transform scale-105' 
                        : 'bg-white border-gray-200 text-gray-600 hover:border-saney-gold hover:text-saney-gold'
                      }`}
                  >
                    <input
                      type="radio"
                      name="hasExperience"
                      value={option}
                      checked={formData.hasExperience === option}
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <span className="capitalize">{option}</span>
                  </label>
                ))}
              </div>
              {formData.hasExperience === 'oui' && (
                <input
                  type="text"
                  name="experienceDetails"
                  value={formData.experienceDetails}
                  onChange={handleInputChange}
                  placeholder="Si oui, précisez..."
                  className="w-full border-b border-gray-300 focus:border-saney-gold outline-none py-2 bg-white/70 backdrop-blur-sm text-sm mt-2"
                />
              )}
            </div>

            {/* Q3 */}
            <div className="space-y-3 bg-white/50 backdrop-blur-sm rounded-xl p-6">
              <label className="block font-medium text-gray-800">3. Qu'attendez-vous principalement de cette formation ?</label>
              <p className="text-sm text-gray-500 italic">(ex : apprendre les bases, gagner en confiance, se perfectionner, créer une activité...)</p>
              <textarea
                name="expectations"
                value={formData.expectations}
                onChange={handleInputChange}
                className="w-full p-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-saney-gold outline-none transition-shadow"
                rows={3}
              />
            </div>

            {/* Q4 */}
            <div className="space-y-3 bg-white/50 backdrop-blur-sm rounded-xl p-6">
              <label className="block font-medium text-gray-800">4. Préférez-vous :</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {['La pratique', 'La théorie', 'Un équilibre entre les deux'].map((option) => (
                  <label 
                    key={option} 
                    className={`cursor-pointer py-3 px-4 rounded-xl border text-center transition-all duration-300 shadow-sm flex items-center justify-center h-full
                      ${formData.learningPreference === option 
                        ? 'bg-saney-gold border-saney-gold text-white shadow-md' 
                        : 'bg-white border-gray-200 text-gray-600 hover:border-saney-gold hover:text-saney-gold'
                      }`}
                  >
                    <input
                      type="radio"
                      name="learningPreference"
                      value={option}
                      checked={formData.learningPreference === option}
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              <input
                type="text"
                name="learningPreferenceReason"
                value={formData.learningPreferenceReason}
                onChange={handleInputChange}
                placeholder="Pourquoi ?"
                className="w-full border-b border-gray-300 focus:border-saney-gold outline-none py-2 bg-white/70 backdrop-blur-sm text-sm mt-2"
              />
            </div>

            {/* Q5 */}
            <div className="space-y-3 bg-white/50 backdrop-blur-sm rounded-xl p-6">
              <label className="block font-medium text-gray-800">5. Quelles techniques vous intéressent le plus ?</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Gel', 'Semi-permanent', 'Capsules', 'Chablon', 'Nail art'].map((tech) => (
                  <label 
                    key={tech} 
                    className={`cursor-pointer py-3 px-4 rounded-xl border text-center transition-all duration-300 shadow-sm
                      ${formData.techniques.includes(tech) 
                        ? 'bg-saney-gold border-saney-gold text-white shadow-md' 
                        : 'bg-white border-gray-200 text-gray-600 hover:border-saney-gold hover:text-saney-gold'
                      }`}
                  >
                    <input
                      type="checkbox"
                      value={tech}
                      checked={formData.techniques.includes(tech)}
                      onChange={(e) => handleCheckboxChange(e, 'techniques')}
                      className="hidden"
                    />
                    <span>{tech}</span>
                  </label>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm">Autre :</span>
                <input
                  type="text"
                  name="otherTechnique"
                  value={formData.otherTechnique}
                  onChange={handleInputChange}
                  className="flex-1 border-b border-gray-300 focus:border-saney-gold outline-none py-1 bg-white/70 backdrop-blur-sm text-sm"
                />
              </div>
            </div>

            {/* Q6 */}
            <div className="space-y-3 bg-white/50 backdrop-blur-sm rounded-xl p-6">
              <label className="block font-medium text-gray-800">6. Quel est votre projet après la formation ?</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['Travailler en institut', 'Travailler à domicile', 'Ouvrir votre propre activité', 'En réflexion'].map((project) => (
                  <label 
                    key={project} 
                    className={`cursor-pointer py-3 px-4 rounded-xl border text-center transition-all duration-300 shadow-sm
                      ${formData.futureProject.includes(project) 
                        ? 'bg-saney-gold border-saney-gold text-white shadow-md' 
                        : 'bg-white border-gray-200 text-gray-600 hover:border-saney-gold hover:text-saney-gold'
                      }`}
                  >
                    <input
                      type="checkbox"
                      value={project}
                      checked={formData.futureProject.includes(project)}
                      onChange={(e) => handleCheckboxChange(e, 'futureProject')}
                      className="hidden"
                    />
                    <span>{project}</span>
                  </label>
                ))}
              </div>
              <input
                type="text"
                name="futureProjectDetails"
                value={formData.futureProjectDetails}
                onChange={handleInputChange}
                placeholder="Précisez si nécessaire..."
                className="w-full border-b border-gray-300 focus:border-saney-gold outline-none py-2 bg-white/70 backdrop-blur-sm text-sm mt-2"
              />
            </div>

            {/* Q7 */}
            <div className="space-y-3 bg-white/50 backdrop-blur-sm rounded-xl p-6">
              <label className="block font-medium text-gray-800">7. Combien de temps pouvez-vous consacrer à l'entraînement après la formation ?</label>
              <div className="grid grid-cols-1 gap-3">
                {['Moins de 2 heures par semaine', '2 à 5 heures par semaine', 'Plus de 5 heures par semaine'].map((time) => (
                  <label 
                    key={time} 
                    className={`cursor-pointer py-3 px-4 rounded-xl border text-left transition-all duration-300 shadow-sm pl-6
                      ${formData.trainingTime === time 
                        ? 'bg-saney-gold border-saney-gold text-white shadow-md' 
                        : 'bg-white border-gray-200 text-gray-600 hover:border-saney-gold hover:text-saney-gold'
                      }`}
                  >
                    <input
                      type="radio"
                      name="trainingTime"
                      value={time}
                      checked={formData.trainingTime === time}
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <span>{time}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Q8 */}
            <div className="space-y-3 bg-white/50 backdrop-blur-sm rounded-xl p-6">
              <label className="block font-medium text-gray-800">8. Selon vous, quelles sont les qualités importantes pour réussir en onglerie ?</label>
              <p className="text-sm text-gray-500 italic">(ex : patience, précision, sens du contact, créativité...)</p>
              <textarea
                name="qualities"
                value={formData.qualities}
                onChange={handleInputChange}
                className="w-full p-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-saney-gold outline-none"
                rows={3}
              />
            </div>

            {/* Q9 */}
            <div className="space-y-3 bg-white/50 backdrop-blur-sm rounded-xl p-6">
              <label className="block font-medium text-gray-800">9. Avez-vous des craintes ou des difficultés concernant cette formation ?</label>
              <p className="text-sm text-gray-500 italic">(ex : manque de confiance, peur de mal faire, difficulté technique...)</p>
              <textarea
                name="fears"
                value={formData.fears}
                onChange={handleInputChange}
                className="w-full p-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-saney-gold outline-none"
                rows={3}
              />
            </div>

            {/* Q10 */}
            <div className="space-y-3 bg-white/50 backdrop-blur-sm rounded-xl p-6">
              <label className="block font-medium text-gray-800">10. Quels sont vos objectifs professionnels à court terme (3 à 6 mois) ?</label>
              <textarea
                name="shortTermGoals"
                value={formData.shortTermGoals}
                onChange={handleInputChange}
                className="w-full p-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-saney-gold outline-none"
                rows={3}
              />
            </div>

            {/* Submit */}
            <div className="pt-8 text-center">
              <button
                type="submit"
                className="bg-saney-gold text-white px-10 py-4 rounded-full uppercase tracking-widest font-bold hover:bg-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Envoyer ma candidature
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

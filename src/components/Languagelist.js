import React, { useEffect, useState } from 'react'
export default function LanguageList({ selectedLanguage, onSelectLanguage }) {
    const [languages, setLanguages] = useState([]);
  
    useEffect(() => {
      const fetchLanguages = async () => {
        try {
          const API_KEY = process.env.REACT_APP_TMDB_API_KEY || '3fd2be6f0c70a2a598f084ddfb75487c'; // Default key for deployment fallback
          const response = await fetch(
            `https://api.themoviedb.org/3/configuration/languages?api_key=${API_KEY}`
          );
  
          const data = await response.json();
          setLanguages(data);
        } catch (error) {
          console.error('Error fetching languages:', error);
        }
      };
  
      fetchLanguages();
    }, []);
  
    return (
      <select
        value={selectedLanguage}
        onChange={(e) => onSelectLanguage(e.target.value)}
        className='cursor-pointer rounded p-1 inline text-red-600'
      >
        <option value=''>Select a language</option>
        {languages.map((language) => (
          <option key={language.iso_639_1} value={language.iso_639_1}>
            {language.english_name}
          </option>
        ))}
      </select>
    );
  }
  
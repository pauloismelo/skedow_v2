
import { useRef, useState } from 'react';
import { Libraries, LoadScript } from '@react-google-maps/api';

const libraries:Libraries = ['places'];

interface AutoCompletProps{
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AutocompleteInput = ({onchange}:AutoCompletProps) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);


  const API_MAPS = process.env.REACT_APP_API_MAPS;
  //console.log(API_MAPS)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    

    // Quando o usu?rio digitar, buscar as sugest?es
    if (value  && autocompleteService.current) {
      autocompleteService.current.getPlacePredictions(
        { input: value },
        (predictions, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
            setSuggestions(predictions.map((p) => p.description)); // Pegar apenas as descri??es
          } else {
            setSuggestions([]); // Caso n?o tenha sugest?es
          }
        }
      );
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion); // Preencher o campo com a sugest?o selecionada
    setSuggestions([]); // Limpar as sugest?es
  };

  const handleApiLoad = () => {
    if (window.google && window.google.maps.places) {
      //console.log('A biblioteca "places" foi carregada com sucesso.');
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    } else {
      //console.error('A biblioteca "places" nao foi carregada.');
    }
  };
  
  return (
    <LoadScript googleMapsApiKey={API_MAPS} libraries={libraries} onLoad={handleApiLoad}>
      <div style={{ position: 'relative' }} className="row">
        <label>Location</label>
        <input
          type="text"
          name="location"
          value={inputValue}
          onChange={
            (event) => {
              handleInputChange(event);
              onchange(event);
            }}
          placeholder="Digite um endereço ou local"
          
          className="form-control"
        />
        
        {suggestions.length > 0 && (
          <ul
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: 'white',
              zIndex: 1000,
              maxHeight: '200px',
              overflowY: 'auto',
              padding: '0',
              margin: '0',
              listStyle: 'none',
            }}
          >
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                style={{
                  padding: '10px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #eee',
                }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </LoadScript>
  );
};

export default AutocompleteInput;

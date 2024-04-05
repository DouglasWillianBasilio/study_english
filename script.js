// Lista de frases em inglês para estudo
var phrases = [
    "The early bird catches the worm.",
    "Actions speak louder than words.",
    "Practice makes perfect.",
    "Where there's a will, there's a way.",
    "When in Rome, do as the Romans do."
];

// Seleciona uma frase aleatória da lista
var selectedPhrase = phrases[Math.floor(Math.random() * phrases.length)];

// Exibe a frase na página
document.getElementById('phrase').textContent = selectedPhrase;

// Função para confirmar o palpite do usuário
function confirmGuess() {
    var guess = prompt("Qual é a tradução da frase?");
    if (guess && guess.trim().toLowerCase() === selectedPhrase.toLowerCase()) {
        alert("Parabéns! Você acertou!");
    } else {
        alert("Infelizmente, sua resposta está incorreta. Tente novamente.");
    }
}

// Função para traduzir a frase
async function translatePhrase() {
    const apiKey = 'SUA_CHAVE_DE_API_DO_GOOGLE_TRANSLATE';
    const sourceLang = 'en'; // Inglês
    const targetLang = 'pt'; // Português
    const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                q: selectedPhrase,
                source: sourceLang,
                target: targetLang,
                format: 'text'
            })
        });

        const data = await response.json();
        const translatedText = data.data.translations[0].translatedText;
        alert("A tradução da frase é: " + translatedText);
    } catch (error) {
        console.error('Erro ao traduzir a frase:', error);
        alert("Erro ao traduzir a frase. Tente novamente mais tarde.");
    }
}

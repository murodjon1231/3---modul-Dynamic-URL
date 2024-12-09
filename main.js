// const BASE_URL = 'https://api.nationalize.io/'

// let params = '?name='

// let ism  = prompt('Ism Kiriting....!')

// let FULL_API = BASE_URL + params + ism

// const getData = async () => {
//     const res = await fetch(FULL_API)
//     const data = await res.json()

//     console.log(data)
// }

// getData()





async function fetchNationality(name) {
    const baseUrl = 'https://api.nationalize.io/';
    const url = new URL(baseUrl);
    url.searchParams.append('name', name);

    try {
        const response = await fetch(url.toString());
        if (!response.ok) {
            throw new Error('Server javobida xatolik.');
        }
        return await response.json();
    } catch (error) {
        console.error('API so‘rovida xatolik yuz berdi:', error);
        throw error;
    }
}

document.getElementById('btn').addEventListener('click', async () => {
    const name = document.getElementById('nameInput').value.trim();
    const resultDiv = document.getElementById('resultat');
    resultDiv.innerHTML = '';

    if (name === '') {
        resultDiv.textContent = 'Iltimos Ismingni Kirit.';
        return;
    }

    try {
        const data = await fetchNationality(name);

        if (data.country.length > 0) {
            let resultText = `<strong> Nomi uchun millatlar "${name}":</strong><br>`;
            data.country.forEach((country, index) => {
                const flagUrl = `https://flagcdn.com/w40/${country.country_id.toLowerCase()}.png`; 

                resultText += `
                    <div style="display: flex; align-items: center; margin-bottom: 8px;">
                        <img src="${flagUrl}" alt="${country.country_id} flag" style="width: 40px; height: 30px; margin-right: 10px;">
                        ${index + 1}. ${country.country_id} (${(country.probability * 100).toFixed(2)}%)
                    </div>`;
            });
            resultDiv.innerHTML = resultText;
        } else {
            resultDiv.textContent = 'Millatini aniqlab bo\'lmadi.';
        }
    } catch (error) {
        resultDiv.textContent = 'API so‘rovida xatolik yuz berdi.';
    }
});

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '57c9d4b722mshe9e59ab2a4d13eap1f4858jsn0b58cc56de46',
		'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
    }
}

export default async function (query)
{
    let response = await fetch(`https://tasty.p.rapidapi.com/recipes/list?from=0&size=6&q=${query}`, options);

    if (!response.ok)
        throw new Error(`API call failed. ${response.status}`);
    else
        return await response.json();
}
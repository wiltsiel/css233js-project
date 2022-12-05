const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '57c9d4b722mshe9e59ab2a4d13eap1f4858jsn0b58cc56de46',
		'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
    }
}

export default async function (id)
{
    let response = await fetch(`https://tasty.p.rapidapi.com/recipes/get-more-info?id=${id}`, options);

    if (!response.ok)
        throw new Error(`API call failed. ${response.status}`);
    else
        return await response.json();
}
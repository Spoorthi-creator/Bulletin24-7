import {API_KEY,endpoint,language} from '../config/InternationalConfig';

export async function internationalServices(category='general'){
  let articles = await fetch(`${endpoint}?language=${language}&category=${category}`,{
    headers:{
      'X-API-KEY':API_KEY
    }
  })
  let result = await articles.json();
  articles = null;
  return result.articles
}
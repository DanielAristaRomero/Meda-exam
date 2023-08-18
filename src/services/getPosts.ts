import Toast from 'react-native-toast-message';

const BASE_API = 'https://jsonplaceholder.typicode.com'

export const getPosts = async () => {
  try {
    const response = await fetch(`${BASE_API}/posts`);
    const posts = await response.json();
    return posts
  } catch (error) {
    Toast.show({
      position: 'bottom',
      type: 'error',
      text1: `Hubo un error al recuperar los posts`,
    });
  } 
}

import noImage from '../assets/no-image.png'

const getCroppedImageUrl = (url: string) => {
    if(!url) return noImage; //If url is falsy value it return noImage.png file
    /**If the input url is truthy, the first return statement will not be executed, 
     * and the second return statement will be executed. The function will then return 
     * a new string that represents the URL of a cropped image with dimensions 600x400 pixels. */

    const target = 'media/';
    const index = url.indexOf(target) + target.length;
    return url.slice(0, index) + 'crop/600/400/' + url.slice(index);
}

export default getCroppedImageUrl;
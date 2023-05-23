import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import fishImage from '../images/fish.png'
import jobTableListDir from '../js/joblist.json'
import genericNoise from '../images/generic_noise_test.png';
import _128x32Button from '../images/128x32_button.png';
import _512x256Title from '../images/512x256_title.png';
const Resources = {
    Fish: new ImageSource(fishImage),
    GenericNoise: new ImageSource(genericNoise),
    JobTableList: new  Resource(jobTableListDir,"text"),
    b128x32Button: new ImageSource(_128x32Button),
    t512x256Title : new ImageSource(_512x256Title)
}
const resourceArray = []
for (const key in Resources) {
    resourceArray.push(Resources[key])
}
const ResourceLoader = new Loader(resourceArray)


export { Resources, ResourceLoader }
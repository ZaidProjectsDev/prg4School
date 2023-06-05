import {ImageSource, Sound, Resource, Loader, SpriteSheet} from 'excalibur'
import fishImage from '../images/fish.png'
import genericNoise from '../images/generic_noise_test.png';
import _128x32Button from '../images/128x32_button.png';
import _512x256Title from '../images/512x256_title.png';
import _bazooka from '../images/bazooka_idle.png';
import _fireEffect from '../images/fire_spritesheet.png';
const Resources = {
    Fish: new ImageSource(fishImage),
    GenericNoise: new ImageSource(genericNoise),
    b128x32Button: new ImageSource(_128x32Button),
    t512x256Title : new ImageSource(_512x256Title),
    _bazooka: new ImageSource(_bazooka),
    _fireEffect: new ImageSource(_fireEffect)
}
const resourceArray = []
for (const key in Resources) {
    resourceArray.push(Resources[key])
}
const ResourceLoader = new Loader(resourceArray)


export { Resources, ResourceLoader }
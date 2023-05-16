import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import fishImage from '../images/fish.png'
import jobTableListDir from '../js/joblist.json'
const Resources = {
    Fish: new ImageSource(fishImage),
    JobTableList: new  Resource(jobTableListDir,"text")
}
const ResourceLoader = new Loader([Resources.Fish,Resources.JobTableList])

export { Resources, ResourceLoader }
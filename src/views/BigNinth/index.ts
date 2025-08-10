import {
    ArcRotateCamera,
    Engine,
    Scene,
    Vector3,
    Vector4,
    HemisphericLight,
    Mesh,
    MeshBuilder,
    StandardMaterial,
    Color3,
} from 'babylonjs'
import { useText } from './mesh'

export default function (el: HTMLCanvasElement) {
    const engine = new Engine(el, true)
    const scene = new Scene(engine)
    const camera = new ArcRotateCamera(
        'default-camera',
        Math.PI * 1.5,
        0,
        5,
        new Vector3(0, 0, 0),
        scene,
    )
    camera.attachControl(el, true)
    const light = new HemisphericLight(
        'default-light',
        new Vector3(1, 1, 1),
        scene,
    )
    const start = () => engine.runRenderLoop(() => scene.render()) // 启动渲染循环

    return {
        engine,
        scene,
        camera,
        light,
        start,
    }
}

export function addDemo(scene: Scene) {
    /** 添加物品，调整物品的位置、缩放、旋转 */
    const box = MeshBuilder.CreateBox(
        'box',
        { size: 1.5, faceUV: new Array().fill(new Vector4(0, 0, 1, 1)) },
        scene,
    )
    box.position.y = 0.5

    // box.rotation.y = Math.PI / 4;
    // box.scaling.x = 2
    const boxTxt = new StandardMaterial('text')
    boxTxt.diffuseTexture = useText(
        '子',
        { width: 1, height: 1, fontSize: 16 },
        scene,
    )
    box.material = boxTxt

    /** 添加物品，给物品添加材料。材料可以添加颜色、可以添加图片 */
    const ground = MeshBuilder.CreateGround('ground', { width: 3, height: 3 })
    const groundMat = new StandardMaterial('groundMat')
    groundMat.diffuseColor = new Color3(0, 1, 0)
    ground.material = groundMat //Place the material property of the ground
    /** 组合物品，形成整体 */
    // const group = Mesh.MergeMeshes([box])
}

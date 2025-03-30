import {
    Engine,
    Scene,
    ArcRotateCamera,
    Vector3,
    HemisphericLight,
    MeshBuilder,
    CreateSoundAsync,
    CreateAudioEngineAsync,
    StandardMaterial,
    Color3,
} from '@babylonjs/core'

export function useScene(el: HTMLCanvasElement): Scene {
    const engin = new Engine(el)
    const scene = new Scene(engin)
    const camera = new ArcRotateCamera(
        'root',
        -Math.PI / 2,
        Math.PI / 2.5,
        3,
        new Vector3(0, 0, 0),
        scene,
    )
    camera.attachControl(el, true)
    const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene)
    light.intensity = 0.7 // 调节亮度
    const box = MeshBuilder.CreateBox('box', { size: 2 }, scene)
    box.position.y = 4
    new StandardMaterial('name', scene)
    const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 3 }, scene)
    sphere.position.y = 2 // 设置位置
    engin.runRenderLoop(() => {
        scene.render()
    })
    const ground = MeshBuilder.CreateGround('ground', {
        width: 10,
        height: 10,
    })
    const groundMat = new StandardMaterial('groundMat')
    groundMat.diffuseColor = new Color3(0, 1, 0)
    ground.material = groundMat //Place the material property of the ground

    return scene
}

export async function didi() {
    const audioEngine = await CreateAudioEngineAsync()
    await audioEngine.unlockAsync()
    const sound = await CreateSoundAsync('sound', './didi.mp3')
    sound.play()
}

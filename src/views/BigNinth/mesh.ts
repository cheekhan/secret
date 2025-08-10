import { DynamicTexture, Scene } from 'babylonjs'

interface useTextConfig {
    width: number
    height: number // 文字的尺寸
    fontSize: number
    color?: string
    bgColor?: string
}

export function useText(
    label: string,
    config: useTextConfig,
    scene: Scene,
): DynamicTexture {
    const opts = {
        ...config,
        color: config.color ? config.color : '#000000',
        bgColor: config.bgColor ? config.bgColor : '#ffffff',
    }
    const dynamicTexture = new DynamicTexture(
        label,
        {
            width: 20,
            height: 20,
        },
        scene,
        true,
    )
    dynamicTexture.drawText(
        label,
        null,
        null,
        `font-size:${config.fontSize}px`,
        opts.color,
        opts.bgColor,
    )
    return dynamicTexture
}

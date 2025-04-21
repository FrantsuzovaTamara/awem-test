import {Assets} from 'pixi.js'
import {AssetsObject, SpineAsset, Resource} from '../types'

export class AssetsLoaderService {
  private readonly assets: AssetsObject = this.getAssetsObject()

  constructor() {}

  public async loadAssets(): Promise<void> {
    this.loadSpine(this.assets.spine)
    this.loadImages(this.assets.image)
  }


  private async loadSpine(assets: SpineAsset[]): Promise<void> {
    for (const asset of assets) {
      const image = await Assets.load(asset.image)
      asset.atlas.data = {images: image.baseTexture}
      Assets.add(asset.atlas)
      Assets.add(asset.json)
      await Assets.load(asset.atlas)
      await Assets.load(asset.json)
    }
  }

  private async loadImages(assets: Resource[]): Promise<void> {
    for (const asset of assets) {
      if (asset.srcs) await Assets.load(asset.srcs)
    }
  }

  private getAssetsObject(): AssetsObject {
    return {
      spine: [{
        image: {alias: 'builderScrollImage', srcs: './../../assets/builder_scroll/builder_scroll.png'},
        atlas: {alias: 'builderScrollAtlas', src: ['./../../assets/builder_scroll/builder_scroll.atlas']},
        json: {alias: 'builderScrollData', src: ['./../../assets/builder_scroll/builder_scroll.json']},
      }],
      image: [
        {alias: 'blueChip', srcs: './../../assets/chip/ch_blue.png'},
        {alias: 'greenChip', srcs: './../../assets/chip/ch_green.png'},
        {alias: 'pinkChip', srcs: './../../assets/chip/ch_pink.png'},
        {alias: 'redChip', srcs: './../../assets/chip/ch_red.png'},
        {alias: 'yellowChip', srcs: './../../assets/chip/ch_yellow.png'},

        {alias: 'fireworks00', srcs: './../../assets/fireworks/fireworks_00000.png'},
        {alias: 'fireworks01', srcs: './../../assets/fireworks/fireworks_00001.png'},
        {alias: 'fireworks02', srcs: './../../assets/fireworks/fireworks_00002.png'},
        {alias: 'fireworks03', srcs: './../../assets/fireworks/fireworks_00003.png'},
        {alias: 'fireworks04', srcs: './../../assets/fireworks/fireworks_00004.png'},
        {alias: 'fireworks05', srcs: './../../assets/fireworks/fireworks_00005.png'},
        {alias: 'fireworks06', srcs: './../../assets/fireworks/fireworks_00006.png'},
        {alias: 'fireworks07', srcs: './../../assets/fireworks/fireworks_00007.png'},
        {alias: 'fireworks08', srcs: './../../assets/fireworks/fireworks_00008.png'},
        {alias: 'fireworks09', srcs: './../../assets/fireworks/fireworks_00009.png'},
        {alias: 'fireworks10', srcs: './../../assets/fireworks/fireworks_00010.png'},
        {alias: 'fireworks11', srcs: './../../assets/fireworks/fireworks_00011.png'},
        {alias: 'fireworks12', srcs: './../../assets/fireworks/fireworks_00012.png'},
        {alias: 'fireworks13', srcs: './../../assets/fireworks/fireworks_00013.png'},
        {alias: 'fireworks14', srcs: './../../assets/fireworks/fireworks_00014.png'},
        {alias: 'fireworks15', srcs: './../../assets/fireworks/fireworks_00015.png'},
        {alias: 'fireworks16', srcs: './../../assets/fireworks/fireworks_00016.png'},
        {alias: 'fireworks17', srcs: './../../assets/fireworks/fireworks_00017.png'},
        {alias: 'fireworks18', srcs: './../../assets/fireworks/fireworks_00018.png'},
        {alias: 'fireworks19', srcs: './../../assets/fireworks/fireworks_00019.png'},
        {alias: 'fireworks20', srcs: './../../assets/fireworks/fireworks_00020.png'},
        {alias: 'fireworks21', srcs: './../../assets/fireworks/fireworks_00021.png'},
        {alias: 'fireworks22', srcs: './../../assets/fireworks/fireworks_00022.png'},
        {alias: 'fireworks23', srcs: './../../assets/fireworks/fireworks_00023.png'},
        {alias: 'fireworks24', srcs: './../../assets/fireworks/fireworks_00024.png'},
        {alias: 'fireworks25', srcs: './../../assets/fireworks/fireworks_00025.png'},
        {alias: 'fireworks26', srcs: './../../assets/fireworks/fireworks_00026.png'},
        {alias: 'fireworks27', srcs: './../../assets/fireworks/fireworks_00027.png'},
        {alias: 'fireworks28', srcs: './../../assets/fireworks/fireworks_00028.png'},
        {alias: 'fireworks29', srcs: './../../assets/fireworks/fireworks_00029.png'},

        {alias: 'whiteHand00', srcs: './../../assets/whire_hand/WhiteHand_00000.png'},
        {alias: 'whiteHand01', srcs: './../../assets/whire_hand/WhiteHand_00001.png'},
        {alias: 'whiteHand02', srcs: './../../assets/whire_hand/WhiteHand_00002.png'},
        {alias: 'whiteHand03', srcs: './../../assets/whire_hand/WhiteHand_00003.png'},
        {alias: 'whiteHand04', srcs: './../../assets/whire_hand/WhiteHand_00004.png'},
        {alias: 'whiteHand05', srcs: './../../assets/whire_hand/WhiteHand_00005.png'},
        {alias: 'whiteHand06', srcs: './../../assets/whire_hand/WhiteHand_00006.png'},
        {alias: 'whiteHand07', srcs: './../../assets/whire_hand/WhiteHand_00007.png'},
        {alias: 'whiteHand08', srcs: './../../assets/whire_hand/WhiteHand_00008.png'},
        {alias: 'whiteHand09', srcs: './../../assets/whire_hand/WhiteHand_00009.png'},
        {alias: 'whiteHand10', srcs: './../../assets/whire_hand/WhiteHand_00010.png'},
        {alias: 'whiteHand11', srcs: './../../assets/whire_hand/WhiteHand_00011.png'},
        {alias: 'whiteHand12', srcs: './../../assets/whire_hand/WhiteHand_00012.png'},
        {alias: 'whiteHand13', srcs: './../../assets/whire_hand/WhiteHand_00013.png'},
        {alias: 'whiteHand14', srcs: './../../assets/whire_hand/WhiteHand_00014.png'},
        {alias: 'whiteHand15', srcs: './../../assets/whire_hand/WhiteHand_00015.png'},
        {alias: 'whiteHand16', srcs: './../../assets/whire_hand/WhiteHand_00016.png'},
        {alias: 'whiteHand17', srcs: './../../assets/whire_hand/WhiteHand_00017.png'},
        {alias: 'whiteHand18', srcs: './../../assets/whire_hand/WhiteHand_00018.png'},
        {alias: 'whiteHand19', srcs: './../../assets/whire_hand/WhiteHand_00019.png'},
        {alias: 'whiteHand20', srcs: './../../assets/whire_hand/WhiteHand_00020.png'},
        {alias: 'whiteHand21', srcs: './../../assets/whire_hand/WhiteHand_00021.png'},
        {alias: 'whiteHand22', srcs: './../../assets/whire_hand/WhiteHand_00022.png'},
        {alias: 'whiteHand23', srcs: './../../assets/whire_hand/WhiteHand_00023.png'},
        {alias: 'whiteHand24', srcs: './../../assets/whire_hand/WhiteHand_00024.png'},

        {alias: 'field', srcs: './../../assets/field.png'},
        {alias: 'logo', srcs: './../../assets/logo.png'},
        {alias: 'map', srcs: './../../assets/map.png'},
        {alias: 'playButton', srcs: './../../assets/bt_play.png'},
      ]
    }
  }
}

import {Assets} from 'pixi.js'
import {AssetsObject, SpineAsset, Resource} from '../../types'

import builderScrollImage from '../../../assets/builder_scroll/builder_scroll.png'
import builderScrollAtlas from '../../../assets/builder_scroll/builder_scroll.atlas'
import builderScrollJson from '../../../assets/builder_scroll/builder_scroll.json?url'

import blueChip from '../../../assets/chip/ch_blue.png'
import greenChip from '../../../assets/chip/ch_green.png'
import pinkChip from '../../../assets/chip/ch_pink.png'
import redChip from '../../../assets/chip/ch_red.png'
import yellowChip from '../../../assets/chip/ch_yellow.png'
import fireworks00 from '../../../assets/fireworks/fireworks_00000.png'
import fireworks01 from '../../../assets/fireworks/fireworks_00001.png'
import fireworks02 from '../../../assets/fireworks/fireworks_00002.png'
import fireworks03 from '../../../assets/fireworks/fireworks_00003.png'
import fireworks04 from '../../../assets/fireworks/fireworks_00004.png'
import fireworks05 from '../../../assets/fireworks/fireworks_00005.png'
import fireworks06 from '../../../assets/fireworks/fireworks_00006.png'
import fireworks07 from '../../../assets/fireworks/fireworks_00007.png'
import fireworks08 from '../../../assets/fireworks/fireworks_00008.png'
import fireworks09 from '../../../assets/fireworks/fireworks_00009.png'
import fireworks10 from '../../../assets/fireworks/fireworks_00010.png'
import fireworks11 from '../../../assets/fireworks/fireworks_00011.png'
import fireworks12 from '../../../assets/fireworks/fireworks_00012.png'
import fireworks13 from '../../../assets/fireworks/fireworks_00013.png'
import fireworks14 from '../../../assets/fireworks/fireworks_00014.png'
import fireworks15 from '../../../assets/fireworks/fireworks_00015.png'
import fireworks16 from '../../../assets/fireworks/fireworks_00016.png'
import fireworks17 from '../../../assets/fireworks/fireworks_00017.png'
import fireworks18 from '../../../assets/fireworks/fireworks_00018.png'
import fireworks19 from '../../../assets/fireworks/fireworks_00019.png'
import fireworks20 from '../../../assets/fireworks/fireworks_00020.png'
import fireworks21 from '../../../assets/fireworks/fireworks_00021.png'
import fireworks22 from '../../../assets/fireworks/fireworks_00022.png'
import fireworks23 from '../../../assets/fireworks/fireworks_00023.png'
import fireworks24 from '../../../assets/fireworks/fireworks_00024.png'
import fireworks25 from '../../../assets/fireworks/fireworks_00025.png'
import fireworks26 from '../../../assets/fireworks/fireworks_00026.png'
import fireworks27 from '../../../assets/fireworks/fireworks_00027.png'
import fireworks28 from '../../../assets/fireworks/fireworks_00028.png'
import fireworks29 from '../../../assets/fireworks/fireworks_00029.png'

import whiteHand00 from '../../../assets/white_hand/WhiteHand_00000.png'
import whiteHand01 from '../../../assets/white_hand/WhiteHand_00001.png'
import whiteHand02 from '../../../assets/white_hand/WhiteHand_00002.png'
import whiteHand03 from '../../../assets/white_hand/WhiteHand_00003.png'
import whiteHand04 from '../../../assets/white_hand/WhiteHand_00004.png'
import whiteHand05 from '../../../assets/white_hand/WhiteHand_00005.png'
import whiteHand06 from '../../../assets/white_hand/WhiteHand_00006.png'
import whiteHand07 from '../../../assets/white_hand/WhiteHand_00007.png'
import whiteHand08 from '../../../assets/white_hand/WhiteHand_00008.png'
import whiteHand09 from '../../../assets/white_hand/WhiteHand_00009.png'
import whiteHand10 from '../../../assets/white_hand/WhiteHand_00010.png'
import whiteHand11 from '../../../assets/white_hand/WhiteHand_00011.png'
import whiteHand12 from '../../../assets/white_hand/WhiteHand_00012.png'
import whiteHand13 from '../../../assets/white_hand/WhiteHand_00013.png'
import whiteHand14 from '../../../assets/white_hand/WhiteHand_00014.png'
import whiteHand15 from '../../../assets/white_hand/WhiteHand_00015.png'
import whiteHand16 from '../../../assets/white_hand/WhiteHand_00016.png'
import whiteHand17 from '../../../assets/white_hand/WhiteHand_00017.png'
import whiteHand18 from '../../../assets/white_hand/WhiteHand_00018.png'
import whiteHand19 from '../../../assets/white_hand/WhiteHand_00019.png'
import whiteHand20 from '../../../assets/white_hand/WhiteHand_00020.png'
import whiteHand21 from '../../../assets/white_hand/WhiteHand_00021.png'
import whiteHand22 from '../../../assets/white_hand/WhiteHand_00022.png'
import whiteHand23 from '../../../assets/white_hand/WhiteHand_00023.png'
import whiteHand24 from '../../../assets/white_hand/WhiteHand_00024.png'

import field from '../../../assets/field.png'
import logo from '../../../assets/logo.png'
import map from '../../../assets/map.png'
import playButton from '../../../assets/bt_play.png'



export class AssetsLoaderService {
  private readonly assets: AssetsObject = this.getAssetsObject()

  constructor() {}

  public async loadAssets(): Promise<void> {
    this.loadSpine(this.assets.spine)
    this.loadImages(this.assets.image)
  }


  private async loadSpine(assets: SpineAsset[]): Promise<void> {
    for (const asset of assets) {
      if (asset.image.srcs) {
        const image = await Assets.load(asset.image.srcs)
        asset.atlas.data = {images: image.source}
      }

      Assets.add(asset.atlas)
      Assets.add(asset.json)

      if (asset.atlas.src) await Assets.load(asset.atlas.src)
      console.log(asset.json.src)
      if (asset.json.src) await Assets.load(asset.json.src)
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
        image: {alias: 'builderScrollImage', srcs: builderScrollImage},
        atlas: {alias: 'builderScrollAtlas', src: builderScrollAtlas},
        json: {alias: 'builderScrollData', src: builderScrollJson},
      }],
      image: [
        {alias: 'blueChip', srcs: blueChip},
        {alias: 'greenChip', srcs: greenChip},
        {alias: 'pinkChip', srcs: pinkChip},
        {alias: 'redChip', srcs: redChip},
        {alias: 'yellowChip', srcs: yellowChip},

        {alias: 'fireworks00', srcs: fireworks00},
        {alias: 'fireworks01', srcs: fireworks01},
        {alias: 'fireworks02', srcs: fireworks02},
        {alias: 'fireworks03', srcs: fireworks03},
        {alias: 'fireworks04', srcs: fireworks04},
        {alias: 'fireworks05', srcs: fireworks05},
        {alias: 'fireworks06', srcs: fireworks06},
        {alias: 'fireworks07', srcs: fireworks07},
        {alias: 'fireworks08', srcs: fireworks08},
        {alias: 'fireworks09', srcs: fireworks09},
        {alias: 'fireworks10', srcs: fireworks10},
        {alias: 'fireworks11', srcs: fireworks11},
        {alias: 'fireworks12', srcs: fireworks12},
        {alias: 'fireworks13', srcs: fireworks13},
        {alias: 'fireworks14', srcs: fireworks14},
        {alias: 'fireworks15', srcs: fireworks15},
        {alias: 'fireworks16', srcs: fireworks16},
        {alias: 'fireworks17', srcs: fireworks17},
        {alias: 'fireworks18', srcs: fireworks18},
        {alias: 'fireworks19', srcs: fireworks19},
        {alias: 'fireworks20', srcs: fireworks20},
        {alias: 'fireworks21', srcs: fireworks21},
        {alias: 'fireworks22', srcs: fireworks22},
        {alias: 'fireworks23', srcs: fireworks23},
        {alias: 'fireworks24', srcs: fireworks24},
        {alias: 'fireworks25', srcs: fireworks25},
        {alias: 'fireworks26', srcs: fireworks26},
        {alias: 'fireworks27', srcs: fireworks27},
        {alias: 'fireworks28', srcs: fireworks28},
        {alias: 'fireworks29', srcs: fireworks29},

        {alias: 'whiteHand00', srcs: whiteHand00},
        {alias: 'whiteHand01', srcs: whiteHand01},
        {alias: 'whiteHand02', srcs: whiteHand02},
        {alias: 'whiteHand03', srcs: whiteHand03},
        {alias: 'whiteHand04', srcs: whiteHand04},
        {alias: 'whiteHand05', srcs: whiteHand05},
        {alias: 'whiteHand06', srcs: whiteHand06},
        {alias: 'whiteHand07', srcs: whiteHand07},
        {alias: 'whiteHand08', srcs: whiteHand08},
        {alias: 'whiteHand09', srcs: whiteHand09},
        {alias: 'whiteHand10', srcs: whiteHand10},
        {alias: 'whiteHand11', srcs: whiteHand11},
        {alias: 'whiteHand12', srcs: whiteHand12},
        {alias: 'whiteHand13', srcs: whiteHand13},
        {alias: 'whiteHand14', srcs: whiteHand14},
        {alias: 'whiteHand15', srcs: whiteHand15},
        {alias: 'whiteHand16', srcs: whiteHand16},
        {alias: 'whiteHand17', srcs: whiteHand17},
        {alias: 'whiteHand18', srcs: whiteHand18},
        {alias: 'whiteHand19', srcs: whiteHand19},
        {alias: 'whiteHand20', srcs: whiteHand20},
        {alias: 'whiteHand21', srcs: whiteHand21},
        {alias: 'whiteHand22', srcs: whiteHand22},
        {alias: 'whiteHand23', srcs: whiteHand23},
        {alias: 'whiteHand24', srcs: whiteHand24},

        {alias: 'field', srcs: field},
        {alias: 'logo', srcs: logo},
        {alias: 'map', srcs: map},
        {alias: 'playButton', srcs: playButton},
      ]
    }
  }
}

import {Assets} from 'pixi.js'
import {Resource} from '../types'

import characterImage from '../../assets/character/spine-char.png'

import blueChip from '../../assets/chip/ch_blue.png'
import greenChip from '../../assets/chip/ch_green.png'
import pinkChip from '../../assets/chip/ch_pink.png'
import redChip from '../../assets/chip/ch_red.png'
import yellowChip from '../../assets/chip/ch_yellow.png'

import fireworks00 from '../../assets/fireworks/fireworks_00000.png'
import fireworks01 from '../../assets/fireworks/fireworks_00001.png'
import fireworks02 from '../../assets/fireworks/fireworks_00002.png'
import fireworks03 from '../../assets/fireworks/fireworks_00003.png'
import fireworks04 from '../../assets/fireworks/fireworks_00004.png'
import fireworks05 from '../../assets/fireworks/fireworks_00005.png'
import fireworks06 from '../../assets/fireworks/fireworks_00006.png'
import fireworks07 from '../../assets/fireworks/fireworks_00007.png'
import fireworks08 from '../../assets/fireworks/fireworks_00008.png'
import fireworks09 from '../../assets/fireworks/fireworks_00009.png'
import fireworks10 from '../../assets/fireworks/fireworks_00010.png'
import fireworks11 from '../../assets/fireworks/fireworks_00011.png'
import fireworks12 from '../../assets/fireworks/fireworks_00012.png'
import fireworks13 from '../../assets/fireworks/fireworks_00013.png'
import fireworks14 from '../../assets/fireworks/fireworks_00014.png'
import fireworks15 from '../../assets/fireworks/fireworks_00015.png'
import fireworks16 from '../../assets/fireworks/fireworks_00016.png'
import fireworks17 from '../../assets/fireworks/fireworks_00017.png'
import fireworks18 from '../../assets/fireworks/fireworks_00018.png'
import fireworks19 from '../../assets/fireworks/fireworks_00019.png'
import fireworks20 from '../../assets/fireworks/fireworks_00020.png'
import fireworks21 from '../../assets/fireworks/fireworks_00021.png'
import fireworks22 from '../../assets/fireworks/fireworks_00022.png'
import fireworks23 from '../../assets/fireworks/fireworks_00023.png'
import fireworks24 from '../../assets/fireworks/fireworks_00024.png'
import fireworks25 from '../../assets/fireworks/fireworks_00025.png'
import fireworks26 from '../../assets/fireworks/fireworks_00026.png'
import fireworks27 from '../../assets/fireworks/fireworks_00027.png'
import fireworks28 from '../../assets/fireworks/fireworks_00028.png'
import fireworks29 from '../../assets/fireworks/fireworks_00029.png'

import whiteHand00 from '../../assets/white_hand/WhiteHand_00000.png'
import whiteHand01 from '../../assets/white_hand/WhiteHand_00001.png'
import whiteHand02 from '../../assets/white_hand/WhiteHand_00002.png'
import whiteHand03 from '../../assets/white_hand/WhiteHand_00003.png'
import whiteHand04 from '../../assets/white_hand/WhiteHand_00004.png'
import whiteHand05 from '../../assets/white_hand/WhiteHand_00005.png'
import whiteHand06 from '../../assets/white_hand/WhiteHand_00006.png'
import whiteHand07 from '../../assets/white_hand/WhiteHand_00007.png'
import whiteHand08 from '../../assets/white_hand/WhiteHand_00008.png'
import whiteHand09 from '../../assets/white_hand/WhiteHand_00009.png'
import whiteHand10 from '../../assets/white_hand/WhiteHand_00010.png'
import whiteHand11 from '../../assets/white_hand/WhiteHand_00011.png'
import whiteHand12 from '../../assets/white_hand/WhiteHand_00012.png'
import whiteHand13 from '../../assets/white_hand/WhiteHand_00013.png'
import whiteHand14 from '../../assets/white_hand/WhiteHand_00014.png'
import whiteHand15 from '../../assets/white_hand/WhiteHand_00015.png'
import whiteHand16 from '../../assets/white_hand/WhiteHand_00016.png'
import whiteHand17 from '../../assets/white_hand/WhiteHand_00017.png'
import whiteHand18 from '../../assets/white_hand/WhiteHand_00018.png'
import whiteHand19 from '../../assets/white_hand/WhiteHand_00019.png'
import whiteHand20 from '../../assets/white_hand/WhiteHand_00020.png'
import whiteHand21 from '../../assets/white_hand/WhiteHand_00021.png'
import whiteHand22 from '../../assets/white_hand/WhiteHand_00022.png'
import whiteHand23 from '../../assets/white_hand/WhiteHand_00023.png'
import whiteHand24 from '../../assets/white_hand/WhiteHand_00024.png'

import field from '../../assets/field.png'
import logo from '../../assets/logo.png'
import map from '../../assets/map.png'
import playButton from '../../assets/bt_play.png'

export class ImageLoaderService {
  constructor() {}

  public async loadImages(): Promise<void> {
    const images = this.getAssetsObject()
    await Assets.load(images)
  }

  private getAssetsObject(): Resource[] {
    return [
      {alias: 'characterImage', src: characterImage},
      {alias: 'blueChip', src: blueChip},
      {alias: 'greenChip', src: greenChip},
      {alias: 'pinkChip', src: pinkChip},
      {alias: 'redChip', src: redChip},
      {alias: 'yellowChip', src: yellowChip},

      {alias: 'fireworks00', src: fireworks00},
      {alias: 'fireworks01', src: fireworks01},
      {alias: 'fireworks02', src: fireworks02},
      {alias: 'fireworks03', src: fireworks03},
      {alias: 'fireworks04', src: fireworks04},
      {alias: 'fireworks05', src: fireworks05},
      {alias: 'fireworks06', src: fireworks06},
      {alias: 'fireworks07', src: fireworks07},
      {alias: 'fireworks08', src: fireworks08},
      {alias: 'fireworks09', src: fireworks09},
      {alias: 'fireworks10', src: fireworks10},
      {alias: 'fireworks11', src: fireworks11},
      {alias: 'fireworks12', src: fireworks12},
      {alias: 'fireworks13', src: fireworks13},
      {alias: 'fireworks14', src: fireworks14},
      {alias: 'fireworks15', src: fireworks15},
      {alias: 'fireworks16', src: fireworks16},
      {alias: 'fireworks17', src: fireworks17},
      {alias: 'fireworks18', src: fireworks18},
      {alias: 'fireworks19', src: fireworks19},
      {alias: 'fireworks20', src: fireworks20},
      {alias: 'fireworks21', src: fireworks21},
      {alias: 'fireworks22', src: fireworks22},
      {alias: 'fireworks23', src: fireworks23},
      {alias: 'fireworks24', src: fireworks24},
      {alias: 'fireworks25', src: fireworks25},
      {alias: 'fireworks26', src: fireworks26},
      {alias: 'fireworks27', src: fireworks27},
      {alias: 'fireworks28', src: fireworks28},
      {alias: 'fireworks29', src: fireworks29},

      {alias: 'whiteHand00', src: whiteHand00},
      {alias: 'whiteHand01', src: whiteHand01},
      {alias: 'whiteHand02', src: whiteHand02},
      {alias: 'whiteHand03', src: whiteHand03},
      {alias: 'whiteHand04', src: whiteHand04},
      {alias: 'whiteHand05', src: whiteHand05},
      {alias: 'whiteHand06', src: whiteHand06},
      {alias: 'whiteHand07', src: whiteHand07},
      {alias: 'whiteHand08', src: whiteHand08},
      {alias: 'whiteHand09', src: whiteHand09},
      {alias: 'whiteHand10', src: whiteHand10},
      {alias: 'whiteHand11', src: whiteHand11},
      {alias: 'whiteHand12', src: whiteHand12},
      {alias: 'whiteHand13', src: whiteHand13},
      {alias: 'whiteHand14', src: whiteHand14},
      {alias: 'whiteHand15', src: whiteHand15},
      {alias: 'whiteHand16', src: whiteHand16},
      {alias: 'whiteHand17', src: whiteHand17},
      {alias: 'whiteHand18', src: whiteHand18},
      {alias: 'whiteHand19', src: whiteHand19},
      {alias: 'whiteHand20', src: whiteHand20},
      {alias: 'whiteHand21', src: whiteHand21},
      {alias: 'whiteHand22', src: whiteHand22},
      {alias: 'whiteHand23', src: whiteHand23},
      {alias: 'whiteHand24', src: whiteHand24},

      {alias: 'field', src: field},
      {alias: 'logo', src: logo},
      {alias: 'map', src: map},
      {alias: 'playButton', src: playButton},
    ]
  }
}

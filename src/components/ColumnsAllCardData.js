import { ColumnFilter } from './ColumnFilter'


export const COLUMNS =  [  
  {
      Header: 'all_parts',
      Footer: 'all_parts',
      accessor: 'allParts',
  },
  {
    Header: 'arena_id',
    Footer: 'arena_id',
    accessor: 'arenaId',        
  },
  {
      Header: 'artist',
      Footer: 'artist',
      accessor: 'artist',
  },
  {
      Header: 'artist_ids',
      Footer: 'artist_ids',
      accessor: 'artistIds',
  },
  {
      Header: 'attraction_lights',
      Footer: 'attraction_lights',
      accessor: 'attractionLights',
  },
  {
      Header: 'booster',
      Footer: 'booster',
      accessor: 'booster',
  },
  {
      Header: 'border_color',
      Footer: 'border_color',
      accessor: 'borderColor',
    //   maxWidth: 130,
    //   minWidth: 10,
    //   width: 110,
  },
  {
      Header: 'card_back_id',
      Footer: 'card_back_id',
      accessor: 'cardBackId',
  },
  {
      Header: 'card_faces',
      Footer: 'card_faces',
      accessor: 'cardFaces',
  },
  {
      Header: 'cardmarket_id',
      Footer: 'cardmarket_id',
      accessor: 'cardmarketId',
  },
  {
      Header: 'cmc',
      Footer: 'cmc',
      accessor: 'cmc',
  },
  {
      Header: 'collector_number',
      Footer: 'collector_number',
      accessor: 'collectorNumber',
  },
  {
      Header: 'color_identity',
      Footer: 'color_identity',
      accessor: 'colorIdentity',
  },
  {
      Header: 'color_indicator',
      Footer: 'color_indicator',
      accessor: 'colorIndicator',
  },
  {
      Header: 'colors',
      Footer: 'colors',
      accessor: 'colors',
  },
  {
      Header: 'content_warning',
      Footer: 'content_warning',
      accessor: 'contentWarning',
  },
  {
      Header: 'digital',
      Footer: 'digital',
      accessor: 'digital',
  },
  {
      Header: 'edhrec_rank',
      Footer: 'edhrec_rank',
      accessor: 'edhrecRank',
  },
  {
      Header: 'finishes',
      Footer: 'finishes',
      accessor: 'finishes',
  },
  {
      Header: 'flavor_name',
      Footer: 'flavor_name',
      accessor: 'flavorName',
  },
  {
      Header: 'flavor_text',
      Footer: 'flavor_text',
      accessor: 'flavorText',
  },
  {
      Header: 'foil',
      Footer: 'foil',
      accessor: 'foil',
  },
  {
      Header: 'frame',
      Footer: 'frame',
      accessor: 'frame',
  },
  {
      Header: 'frame_effects',
      Footer: 'frame_effects',
      accessor: 'frameEffects',
  },
  {
      Header: 'full_art',
      Footer: 'full_art',
      accessor: 'fullArt',
  },
  {
      Header: 'games',
      Footer: 'games',
      accessor: 'games',
  },
  {
      Header: 'hand_modifier',
      Footer: 'hand_modifier',
      accessor: 'handModifier',
  },
  {
      Header: 'highres_image',
      Footer: 'highres_image',
      accessor: 'highresImage',
  },
  {
    id: 'id', // luultavimmin voi poistaa
    Header: 'id',
    Footer: 'id',
    accessor: 'id',
    // Filter: ColumnFilter,
    // disableFilters: true
  },
  {
      Header: 'illustration_id',
      Footer: 'illustration_id',
      accessor: 'illustration_id',
  },
  {
      Header: 'image_status',
      Footer: 'image_status',
      accessor: 'imageStatus',
  },
  {
      Header: 'image_uris',
      Footer: 'image_uris',
      accessor: 'imageUris',
  },
  {
      Header: 'keywords',
      Footer: 'keywords',
      accessor: 'keywords',
  },
  {
      Header: 'lang',
      Footer: 'lang',
      accessor: 'lang',
    //   maxWidth: 100,
    //   minWidth: 40,
    //   width: 60,
  },
  {
      Header: 'layout',
      Footer: 'layout',
      accessor: 'layout',
  },
  {
      Header: 'legalities',
      Footer: 'legalities',
      accessor: 'legalities',
  },
  {
      Header: 'life_modifier',
      Footer: 'life_modifier',
      accessor: 'lifeModifier',
  },
  {
      Header: 'loyalty',
      Footer: 'loyalty',
      accessor: 'loyalty',
  },
  {
      Header: 'mana_cost',
      Footer: 'mana_cost',
      accessor: 'manaCost',
    //   maxWidth: 300,
    //   minWidth: 100,
    //   width: 150,
  },
  {
      Header: 'mtgo_foil_id',
      Footer: 'mtgo_foil_id',
      accessor: 'mtgoFoilId',
  },
  {
      Header: 'mtgo_id',
      Footer: 'mtgo_id',
      accessor: 'mtgoId',
  },
  {
      Header: 'multiverse_ids',
      Footer: 'multiverse_ids',
      accessor: 'multiverseIds',
  },
  {
      Header: 'name',
      Footer: 'name',
      accessor: 'name',
    //   maxWidth: 350,
    //   minWidth: 100,
    //   width: 200,
  },
  {
      Header: 'nonfoil',
      Footer: 'nonfoil',
      accessor: 'nonfoil',
  },
  {
      Header: 'object',
      Footer: 'object',
      accessor: 'object',
    //   maxWidth: 140,
    //   minWidth: 50,
    //   width: 80,
  },
  {
      Header: 'oracle_id',
      Footer: 'oracle_id',
      accessor: 'oracleId',
  },
  {
      Header: 'oracle_text',
      Footer: 'oracle_text',
      accessor: 'oracleText',
    //   maxWidth: 600,
    //   minWidth: 100,
    //   width: 400,
  },
  {
      Header: 'oversized',
      Footer: 'oversized',
      accessor: 'oversized',
  },
  {
      Header: 'penny_rank',
      Footer: 'penny_rank',
      accessor: 'pennyRank',
  },
  {
      Header: 'power',
      Footer: 'power',
      accessor: 'power',
    //   maxWidth: 100,
    //   minWidth: 40,
    //   width: 60,
  },
  {
      Header: 'previewed_at',
      Footer: 'previewed_at',
      accessor: 'previewedAt',
  },
  {
      Header: 'prices',
      Footer: 'prices',
      accessor: 'prices',
  },
  {
      Header: 'printed_name',
      Footer: 'printed_name',
      accessor: 'printedName',
  },
  {
      Header: 'printed_text',
      Footer: 'printed_text',
      accessor: 'printedText',
  },
  {
      Header: 'printed_type_line',
      Footer: 'printed_type_line',
      accessor: 'printedTypeLine',
  },
  {
      Header: 'prints_search_uri',
      Footer: 'prints_search_uri',
      accessor: 'printsSearchUri',
  },
  {
      Header: 'produced_mana',
      Footer: 'produced_mana',
      accessor: 'producedMana',
  },
  {
      Header: 'promo',
      Footer: 'promo',
      accessor: 'promo',
  },
  {
      Header: 'promo_types',
      Footer: 'promo_types',
      accessor: 'promoTypes',
  },
  {
      Header: 'purchase_uris',
      Footer: 'purchase_uris',
      accessor: 'purchaseUris',
  },
  {
      Header: 'rarity',
      Footer: 'rarity',
      accessor: 'rarity',
    //   maxWidth: 150,
    //   minWidth: 100,
    //   width: 100,
  },
  {
      Header: 'related_uris',
      Footer: 'related_uris',
      accessor: 'relatedUris',
  },
  {
      Header: 'released_at',
      Footer: 'released_at',
      accessor: 'releasedAt',
  },
  {
      Header: 'reprint',
      Footer: 'reprint',
      accessor: 'reprint',
  },
  {
      Header: 'reserved',
      Footer: 'reserved',
      accessor: 'reserved',
  },
  {
      Header: 'rulings_uri',
      Footer: 'rulings_uri',
      accessor: 'rulingsUri',
  },
  {
      Header: 'scryfall_set_uri',
      Footer: 'scryfall_set_uri',
      accessor: 'scryfallSetUri',
  },
  {
      Header: 'scryfall_uri',
      Footer: 'scryfall_uri',
      accessor: 'scryfallUri',
  },
  {
      Header: 'security_stamp',
      Footer: 'security_stamp',
      accessor: 'securityStamp',
  },
  {
      Header: '[set]',
      Footer: '[set]',
      accessor: 'set',  
    //   maxWidth: 140,
    //   minWidth: 60,
    //   width: 70,      
  },
  {
      Header: 'set_id',
      Footer: 'set_id',
      accessor: 'setId',
  },
  {
      Header: 'set_name',
      Footer: 'set_name',
      accessor: 'setName',
    //   maxWidth: 300,
    //   minWidth: 100,
    //   width: 180,
  },
  {
      Header: 'set_search_uri',
      Footer: 'set_search_uri',
      accessor: 'setSearchUri',
  },
  {
      Header: 'set_type',
      Footer: 'set_type',
      accessor: 'setType',
  },
  {
      Header: 'set_uri',
      Footer: 'set_uri',
      accessor: 'setUri',
  },
  {
      Header: 'source',
      Footer: 'source',
      accessor: 'source',
  },
  {
      Header: 'source_uri',
      Footer: 'source_uri',
      accessor: 'sourceUri',
  },
  {
      Header: 'story_spotlight',
      Footer: 'story_spotlight',
      accessor: 'storySpotlight',
  },
  {
      Header: 'tcgplayer_etched_id',
      Footer: 'tcgplayer_etched_id',
      accessor: 'tcgplayerEtchedId',
  },
  {
      Header: 'tcgplayer_id',
      Footer: 'tcgplayer_id',
      accessor: 'tcgplayerId',
  },
  {
      Header: 'textless',
      Footer: 'textless',
      accessor: 'textless',
  },
  {
      Header: 'toughness',
      Footer: 'toughness',
      accessor: 'toughness',
    //   maxWidth: 100,
    //   minWidth: 40,
    //   width: 60,
  },
  {
      Header: 'type_line',
      Footer: 'type_line',
      accessor: 'typeLine',
    //   maxWidth: 400,
    //   minWidth: 100,
    //   width: 250,
  },
  {
      Header: 'uri',
      Footer: 'uri',
      accessor: 'uri',
  },
  {
      Header: 'variation',
      Footer: 'variation',
      accessor: 'variation',
  },
  {
      Header: 'variation_of',
      Footer: 'variation_of',
      accessor: 'variationOf',
  },
  {
      Header: 'watermark',
      Footer: 'watermark',
      accessor: 'watermark',
  },
  // {
  //     width: 50,
  //     Header: ('Action'),
  //     // accessor: 'action',
  //     Cell: row => (
  //     <div>
  //       {/* <button onClick={e=> handleShowDetails(row.row.original)}>Details</button> */}
  //       {/* <button onClick={e=> handleDelete(row.row.original)}>Delete</button> */}
  //     </div>
  //     ),
  //   },
  ]

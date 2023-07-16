import { ColumnFilter } from './ColumnFilter'

export const COLUMNS =  [
    {
        Header: 'Owned',
        Footer: 'count',
        accessor: 'count',     
        maxWidth: 80,
        minWidth: 50,
        width: 60,   
    },
    {
        Header: 'Name',
        Footer: 'name',
        accessor: 'idNavigation.name',
    },
    {
        Header: 'Rarity',
        Footer: 'rarity',
        accessor: 'idNavigation.rarity',
        maxWidth: 120,
        minWidth: 50,
        width: 70,
    },
    {
        Header: 'Set',
        Footer: 'set_name',
        accessor: 'idNavigation.setName',
        maxWidth: 200,
        minWidth: 100,
        width: 180,
    },
    {
        Header: 'Set code',
        Footer: '[set]',
        accessor: 'idNavigation.set',  
        maxWidth: 100,
        minWidth: 60,
        width: 70,      
    },
    {
        Header: 'Lang',
        Footer: 'lang',
        accessor: 'idNavigation.lang',
        maxWidth: 80,
        minWidth: 40,
        width: 60,
    },
    {
        Header: 'Mana cost',
        Footer: 'mana_cost',
        accessor: 'idNavigation.manaCost',
        maxWidth: 200,
        minWidth: 100,
        width: 150,
    },
    {
        Header: 'Type line',
        Footer: 'type_line',
        accessor: 'idNavigation.typeLine',
        maxWidth: 250,
        minWidth: 100,
        width: 250,
    },
    {
        Header: 'Oracle text',
        Footer: 'oracle_text',
        accessor: 'idNavigation.oracleText',
        maxWidth: 400,
        minWidth: 100,
        width: 400,
        // padding: 10,
    },
    {
        Header: 'Power',
        Footer: 'power',
        accessor: 'idNavigation.power',
        maxWidth: 60,
        minWidth: 40,
        width: 60,
    },
    {
        Header: 'Toughness',
        Footer: 'toughness',
        accessor: 'idNavigation.toughness',
        maxWidth: 60,
        minWidth: 40,
        width: 60,
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
        Header: 'Border color',
        Footer: 'border_color',
        accessor: 'idNavigation.borderColor',
        maxWidth: 110,
        minWidth: 10,
        width: 110,
    },
    {
        Header: 'Object',
        Footer: 'object',
        accessor: 'idNavigation.object',
        maxWidth: 100,
        minWidth: 50,
        width: 80,
    },
  {
      Header: 'All parts',
      Footer: 'all_parts',
      accessor: 'idNavigation.allParts',        
  },
  {
    Header: 'Arena id',
    Footer: 'arena_id',
    accessor: 'idNavigation.arenaId',        
  },
  {
      Header: 'Artist',
      Footer: 'artist',
      accessor: 'idNavigation.artist',
  },
  {
      Header: 'Artist ids',
      Footer: 'artist_ids',
      accessor: 'idNavigation.artistIds',
  },
  {
      Header: 'Attraction lights',
      Footer: 'attraction_lights',
      accessor: 'idNavigation.attractionLights',
  },
  {
      Header: 'Booster',
      Footer: 'booster',
      accessor: 'idNavigation.booster',
  },
  {
      Header: 'Card back id',
      Footer: 'card_back_id',
      accessor: 'idNavigation.cardBackId',
  },
  {
      Header: 'Card faces',
      Footer: 'card_faces',
      accessor: 'idNavigation.cardFaces',
  },
  {
      Header: 'cardmarket_id',
      Footer: 'cardmarket_id',
      accessor: 'idNavigation.cardmarketId',
  },
  {
      Header: 'cmc',
      Footer: 'cmc',
      accessor: 'idNavigation.cmc',
  },
  {
      Header: 'collector_number',
      Footer: 'collector_number',
      accessor: 'idNavigation.collectorNumber',
  },
  {
      Header: 'color_identity',
      Footer: 'color_identity',
      accessor: 'idNavigation.colorIdentity',
  },
  {
      Header: 'color_indicator',
      Footer: 'color_indicator',
      accessor: 'idNavigation.colorIndicator',
  },
  {
      Header: 'colors',
      Footer: 'colors',
      accessor: 'idNavigation.colors',
  },
  {
      Header: 'content_warning',
      Footer: 'content_warning',
      accessor: 'idNavigation.contentWarning',
  },
  {
      Header: 'digital',
      Footer: 'digital',
      accessor: 'idNavigation.digital',
  },
  {
      Header: 'edhrec_rank',
      Footer: 'edhrec_rank',
      accessor: 'idNavigation.edhrecRank',
  },
  {
      Header: 'finishes',
      Footer: 'finishes',
      accessor: 'idNavigation.finishes',
  },
  {
      Header: 'flavor_name',
      Footer: 'flavor_name',
      accessor: 'idNavigation.flavorName',
  },
  {
      Header: 'flavor_text',
      Footer: 'flavor_text',
      accessor: 'idNavigation.flavorText',
  },
  {
      Header: 'foil',
      Footer: 'foil',
      accessor: 'idNavigation.foil',
  },
  {
      Header: 'frame',
      Footer: 'frame',
      accessor: 'idNavigation.frame',
  },
  {
      Header: 'frame_effects',
      Footer: 'frame_effects',
      accessor: 'idNavigation.frameEffects',
  },
  {
      Header: 'full_art',
      Footer: 'full_art',
      accessor: 'idNavigation.fullArt',
  },
  {
      Header: 'games',
      Footer: 'games',
      accessor: 'idNavigation.games',
  },
  {
      Header: 'hand_modifier',
      Footer: 'hand_modifier',
      accessor: 'idNavigation.handModifier',
  },
  {
      Header: 'highres_image',
      Footer: 'highres_image',
      accessor: 'idNavigation.highresImage',
  },
  {
      Header: 'illustration_id',
      Footer: 'illustration_id',
      accessor: 'idNavigation.illustration_id',
  },
  {
      Header: 'image_status',
      Footer: 'image_status',
      accessor: 'idNavigation.imageStatus',
  },
  {
      Header: 'image_uris',
      Footer: 'image_uris',
      accessor: 'idNavigation.imageUris',
  },
  {
      Header: 'keywords',
      Footer: 'keywords',
      accessor: 'idNavigation.keywords',
  },
  {
      Header: 'layout',
      Footer: 'layout',
      accessor: 'idNavigation.layout',
  },
  {
      Header: 'legalities',
      Footer: 'legalities',
      accessor: 'idNavigation.legalities',
  },
  {
      Header: 'life_modifier',
      Footer: 'life_modifier',
      accessor: 'idNavigation.lifeModifier',
  },
  {
      Header: 'loyalty',
      Footer: 'loyalty',
      accessor: 'idNavigation.loyalty',
  },
  {
      Header: 'mtgo_foil_id',
      Footer: 'mtgo_foil_id',
      accessor: 'idNavigation.mtgoFoilId',
  },
  {
      Header: 'mtgo_id',
      Footer: 'mtgo_id',
      accessor: 'idNavigation.mtgoId',
  },
  {
      Header: 'multiverse_ids',
      Footer: 'multiverse_ids',
      accessor: 'idNavigation.multiverseIds',
  },
  {
      Header: 'nonfoil',
      Footer: 'nonfoil',
      accessor: 'idNavigation.nonfoil',
  },
  {
      Header: 'oracle_id',
      Footer: 'oracle_id',
      accessor: 'idNavigation.oracleId',
  },
  {
      Header: 'oversized',
      Footer: 'oversized',
      accessor: 'idNavigation.oversized',
  },
  {
      Header: 'penny_rank',
      Footer: 'penny_rank',
      accessor: 'idNavigation.pennyRank',
  },
  {
      Header: 'previewed_at',
      Footer: 'previewed_at',
      accessor: 'idNavigation.previewedAt',
  },
  {
      Header: 'prices',
      Footer: 'prices',
      accessor: 'idNavigation.prices',
  },
  {
      Header: 'printed_name',
      Footer: 'printed_name',
      accessor: 'idNavigation.printedName',
  },
  {
      Header: 'printed_text',
      Footer: 'printed_text',
      accessor: 'idNavigation.printedText',
  },
  {
      Header: 'printed_type_line',
      Footer: 'printed_type_line',
      accessor: 'idNavigation.printedTypeLine',
  },
  {
      Header: 'prints_search_uri',
      Footer: 'prints_search_uri',
      accessor: 'idNavigation.printsSearchUri',
  },
  {
      Header: 'produced_mana',
      Footer: 'produced_mana',
      accessor: 'idNavigation.producedMana',
  },
  {
      Header: 'promo',
      Footer: 'promo',
      accessor: 'idNavigation.promo',
  },
  {
      Header: 'promo_types',
      Footer: 'promo_types',
      accessor: 'idNavigation.promoTypes',
  },
  {
      Header: 'purchase_uris',
      Footer: 'purchase_uris',
      accessor: 'idNavigation.purchaseUris',
  },
  {
      Header: 'related_uris',
      Footer: 'related_uris',
      accessor: 'idNavigation.relatedUris',
  },
  {
      Header: 'released_at',
      Footer: 'released_at',
      accessor: 'idNavigation.releasedAt',
  },
  {
      Header: 'reprint',
      Footer: 'reprint',
      accessor: 'idNavigation.reprint',
  },
  {
      Header: 'reserved',
      Footer: 'reserved',
      accessor: 'idNavigation.reserved',
  },
  {
      Header: 'rulings_uri',
      Footer: 'rulings_uri',
      accessor: 'idNavigation.rulingsUri',
  },
  {
      Header: 'scryfall_set_uri',
      Footer: 'scryfall_set_uri',
      accessor: 'idNavigation.scryfallSetUri',
  },
  {
      Header: 'scryfall_uri',
      Footer: 'scryfall_uri',
      accessor: 'idNavigation.scryfallUri',
  },
  {
      Header: 'security_stamp',
      Footer: 'security_stamp',
      accessor: 'idNavigation.securityStamp',
  },
  {
      Header: 'set_id',
      Footer: 'set_id',
      accessor: 'idNavigation.setId',
  },
  {
      Header: 'set_search_uri',
      Footer: 'set_search_uri',
      accessor: 'idNavigation.setSearchUri',
  },
  {
      Header: 'set_type',
      Footer: 'set_type',
      accessor: 'idNavigation.setType',
  },
  {
      Header: 'set_uri',
      Footer: 'set_uri',
      accessor: 'idNavigation.setUri',
  },
  {
      Header: 'source',
      Footer: 'source',
      accessor: 'idNavigation.source',
  },
  {
      Header: 'source_uri',
      Footer: 'source_uri',
      accessor: 'idNavigation.sourceUri',
  },
  {
      Header: 'story_spotlight',
      Footer: 'story_spotlight',
      accessor: 'idNavigation.storySpotlight',
  },
  {
      Header: 'tcgplayer_etched_id',
      Footer: 'tcgplayer_etched_id',
      accessor: 'idNavigation.tcgplayerEtchedId',
  },
  {
      Header: 'tcgplayer_id',
      Footer: 'tcgplayer_id',
      accessor: 'idNavigation.tcgplayerId',
  },
  {
      Header: 'textless',
      Footer: 'textless',
      accessor: 'idNavigation.textless',
  },
  {
      Header: 'uri',
      Footer: 'uri',
      accessor: 'idNavigation.uri',
  },
  {
      Header: 'variation',
      Footer: 'variation',
      accessor: 'idNavigation.variation',
  },
  {
      Header: 'variation_of',
      Footer: 'variation_of',
      accessor: 'idNavigation.variationOf',
  },
  {
      Header: 'watermark',
      Footer: 'watermark',
      accessor: 'idNavigation.watermark',
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
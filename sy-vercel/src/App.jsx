import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";

/* ===================== DONNÉES DU PLATEAU ===================== */
const BOARD = {"seed":71623,"width":971,"height":975,"nodes":[{"id":1,"x":63,"y":55},{"id":2,"x":167,"y":55},{"id":3,"x":240,"y":65},{"id":4,"x":311,"y":71},{"id":5,"x":409,"y":47},{"id":6,"x":627,"y":47},{"id":7,"x":697,"y":58,"name":"Vieux Lyon","metro":true},{"id":8,"x":816,"y":79,"name":"Monplaisir","metro":true},{"id":9,"x":889,"y":77},{"id":10,"x":53,"y":148},{"id":11,"x":150,"y":128},{"id":12,"x":252,"y":138},{"id":13,"x":318,"y":139,"name":"Foch","metro":true},{"id":14,"x":445,"y":132},{"id":15,"x":528,"y":130,"name":"Cordeliers","metro":true},{"id":16,"x":617,"y":137},{"id":17,"x":725,"y":127},{"id":18,"x":773,"y":149},{"id":19,"x":911,"y":127},{"id":20,"x":42,"y":192},{"id":21,"x":151,"y":218},{"id":22,"x":341,"y":188},{"id":23,"x":439,"y":195},{"id":24,"x":513,"y":207},{"id":25,"x":636,"y":184},{"id":26,"x":719,"y":194},{"id":27,"x":801,"y":216},{"id":28,"x":868,"y":201,"name":"Guillotière","metro":true},{"id":29,"x":83,"y":273},{"id":30,"x":127,"y":272},{"id":31,"x":219,"y":270},{"id":32,"x":332,"y":264},{"id":33,"x":424,"y":252,"name":"Perrache","metro":true},{"id":34,"x":509,"y":281},{"id":35,"x":620,"y":288},{"id":36,"x":708,"y":284},{"id":37,"x":777,"y":283},{"id":38,"x":52,"y":342},{"id":39,"x":137,"y":340},{"id":40,"x":228,"y":353},{"id":41,"x":311,"y":328},{"id":42,"x":453,"y":338,"name":"Brotteaux","metro":true},{"id":43,"x":524,"y":322},{"id":44,"x":604,"y":349},{"id":45,"x":690,"y":353},{"id":46,"x":771,"y":357},{"id":47,"x":883,"y":333},{"id":48,"x":73,"y":410},{"id":49,"x":147,"y":403},{"id":50,"x":263,"y":391},{"id":51,"x":317,"y":429},{"id":52,"x":403,"y":429},{"id":53,"x":504,"y":411,"name":"Grange Blanche","metro":true},{"id":54,"x":726,"y":417},{"id":55,"x":810,"y":399},{"id":56,"x":911,"y":396,"name":"Charpennes","metro":true},{"id":57,"x":53,"y":486},{"id":58,"x":167,"y":486},{"id":59,"x":220,"y":473},{"id":60,"x":353,"y":462},{"id":61,"x":427,"y":477},{"id":62,"x":544,"y":482},{"id":63,"x":604,"y":488,"name":"Vénissieux","metro":true},{"id":64,"x":722,"y":474},{"id":65,"x":819,"y":477,"name":"Gratte-Ciel","metro":true},{"id":66,"x":909,"y":491},{"id":67,"x":62,"y":553},{"id":68,"x":164,"y":563},{"id":69,"x":246,"y":542,"name":"Croix-Rousse","metro":true},{"id":70,"x":449,"y":533},{"id":71,"x":501,"y":568},{"id":72,"x":614,"y":565,"name":"Gerland","metro":true},{"id":73,"x":704,"y":540},{"id":74,"x":777,"y":565},{"id":75,"x":896,"y":558},{"id":76,"x":52,"y":624},{"id":77,"x":140,"y":602},{"id":78,"x":235,"y":603},{"id":79,"x":352,"y":616},{"id":80,"x":440,"y":612},{"id":81,"x":502,"y":629},{"id":82,"x":624,"y":628},{"id":83,"x":690,"y":607},{"id":84,"x":799,"y":638},{"id":85,"x":893,"y":633},{"id":86,"x":157,"y":677},{"id":87,"x":269,"y":705,"name":"Part-Dieu","metro":true},{"id":88,"x":317,"y":696},{"id":89,"x":410,"y":698},{"id":90,"x":501,"y":698},{"id":91,"x":605,"y":702},{"id":92,"x":714,"y":707},{"id":93,"x":775,"y":688},{"id":94,"x":905,"y":681},{"id":95,"x":52,"y":749},{"id":96,"x":135,"y":756},{"id":97,"x":265,"y":765},{"id":98,"x":311,"y":768},{"id":99,"x":413,"y":766},{"id":100,"x":495,"y":763},{"id":101,"x":632,"y":779},{"id":102,"x":781,"y":744},{"id":103,"x":886,"y":755,"name":"Saxe-Gambetta","metro":true},{"id":104,"x":56,"y":822},{"id":105,"x":142,"y":839},{"id":106,"x":243,"y":814},{"id":107,"x":329,"y":824},{"id":108,"x":420,"y":848},{"id":109,"x":518,"y":835,"name":"Jean Macé","metro":true},{"id":110,"x":634,"y":816},{"id":111,"x":684,"y":812},{"id":112,"x":793,"y":842},{"id":113,"x":881,"y":847},{"id":114,"x":66,"y":903},{"id":115,"x":150,"y":899,"name":"Bellecour","metro":true},{"id":116,"x":240,"y":890},{"id":117,"x":355,"y":887},{"id":118,"x":520,"y":914,"name":"Hôtel de Ville","metro":true},{"id":119,"x":611,"y":895},{"id":120,"x":708,"y":915},{"id":121,"x":810,"y":900},{"id":122,"x":897,"y":908}],"edges":[{"a":1,"b":10,"type":"taxi","line":null},{"a":1,"b":2,"type":"taxi","line":null},{"a":1,"b":11,"type":"taxi","line":null},{"a":1,"b":20,"type":"taxi","line":null},{"a":2,"b":3,"type":"taxi","line":null},{"a":2,"b":11,"type":"taxi","line":null},{"a":2,"b":12,"type":"taxi","line":null},{"a":2,"b":4,"type":"taxi","line":null},{"a":3,"b":4,"type":"taxi","line":null},{"a":3,"b":12,"type":"taxi","line":null},{"a":3,"b":13,"type":"taxi","line":null},{"a":3,"b":11,"type":"taxi","line":null},{"a":4,"b":13,"type":"taxi","line":null},{"a":4,"b":12,"type":"taxi","line":null},{"a":4,"b":5,"type":"taxi","line":null},{"a":4,"b":22,"type":"taxi","line":null},{"a":5,"b":14,"type":"taxi","line":null},{"a":5,"b":13,"type":"taxi","line":null},{"a":5,"b":15,"type":"taxi","line":null},{"a":5,"b":23,"type":"taxi","line":null},{"a":6,"b":7,"type":"taxi","line":null},{"a":6,"b":16,"type":"taxi","line":null},{"a":6,"b":17,"type":"taxi","line":null},{"a":6,"b":15,"type":"taxi","line":null},{"a":7,"b":17,"type":"taxi","line":null},{"a":7,"b":16,"type":"taxi","line":null},{"a":7,"b":18,"type":"taxi","line":null},{"a":7,"b":8,"type":"taxi","line":null},{"a":8,"b":9,"type":"taxi","line":null},{"a":8,"b":18,"type":"taxi","line":null},{"a":8,"b":17,"type":"taxi","line":null},{"a":8,"b":19,"type":"taxi","line":null},{"a":9,"b":19,"type":"taxi","line":null},{"a":9,"b":28,"type":"taxi","line":null},{"a":9,"b":18,"type":"taxi","line":null},{"a":9,"b":27,"type":"taxi","line":null},{"a":10,"b":20,"type":"taxi","line":null},{"a":10,"b":11,"type":"taxi","line":null},{"a":10,"b":21,"type":"taxi","line":null},{"a":10,"b":29,"type":"taxi","line":null},{"a":11,"b":21,"type":"taxi","line":null},{"a":11,"b":12,"type":"taxi","line":null},{"a":11,"b":20,"type":"taxi","line":null},{"a":11,"b":30,"type":"taxi","line":null},{"a":12,"b":13,"type":"taxi","line":null},{"a":12,"b":22,"type":"taxi","line":null},{"a":12,"b":21,"type":"taxi","line":null},{"a":12,"b":31,"type":"taxi","line":null},{"a":13,"b":22,"type":"taxi","line":null},{"a":13,"b":32,"type":"taxi","line":null},{"a":13,"b":14,"type":"taxi","line":null},{"a":13,"b":23,"type":"taxi","line":null},{"a":14,"b":23,"type":"taxi","line":null},{"a":14,"b":15,"type":"taxi","line":null},{"a":14,"b":24,"type":"taxi","line":null},{"a":14,"b":22,"type":"taxi","line":null},{"a":15,"b":24,"type":"taxi","line":null},{"a":15,"b":16,"type":"taxi","line":null},{"a":15,"b":23,"type":"taxi","line":null},{"a":15,"b":25,"type":"taxi","line":null},{"a":16,"b":25,"type":"taxi","line":null},{"a":16,"b":17,"type":"taxi","line":null},{"a":16,"b":26,"type":"taxi","line":null},{"a":16,"b":24,"type":"taxi","line":null},{"a":17,"b":18,"type":"taxi","line":null},{"a":17,"b":26,"type":"taxi","line":null},{"a":17,"b":25,"type":"taxi","line":null},{"a":17,"b":27,"type":"taxi","line":null},{"a":18,"b":26,"type":"taxi","line":null},{"a":18,"b":27,"type":"taxi","line":null},{"a":18,"b":28,"type":"taxi","line":null},{"a":18,"b":37,"type":"taxi","line":null},{"a":19,"b":28,"type":"taxi","line":null},{"a":19,"b":18,"type":"taxi","line":null},{"a":19,"b":27,"type":"taxi","line":null},{"a":20,"b":29,"type":"taxi","line":null},{"a":20,"b":21,"type":"taxi","line":null},{"a":20,"b":30,"type":"taxi","line":null},{"a":20,"b":38,"type":"taxi","line":null},{"a":21,"b":30,"type":"taxi","line":null},{"a":21,"b":31,"type":"taxi","line":null},{"a":21,"b":29,"type":"taxi","line":null},{"a":21,"b":39,"type":"taxi","line":null},{"a":22,"b":32,"type":"taxi","line":null},{"a":22,"b":23,"type":"taxi","line":null},{"a":22,"b":33,"type":"taxi","line":null},{"a":22,"b":41,"type":"taxi","line":null},{"a":23,"b":33,"type":"taxi","line":null},{"a":23,"b":24,"type":"taxi","line":null},{"a":23,"b":34,"type":"taxi","line":null},{"a":23,"b":32,"type":"taxi","line":null},{"a":24,"b":34,"type":"taxi","line":null},{"a":24,"b":33,"type":"taxi","line":null},{"a":24,"b":43,"type":"taxi","line":null},{"a":24,"b":25,"type":"taxi","line":null},{"a":25,"b":26,"type":"taxi","line":null},{"a":25,"b":35,"type":"taxi","line":null},{"a":25,"b":36,"type":"taxi","line":null},{"a":25,"b":6,"type":"taxi","line":null},{"a":26,"b":27,"type":"taxi","line":null},{"a":26,"b":36,"type":"taxi","line":null},{"a":26,"b":37,"type":"taxi","line":null},{"a":26,"b":35,"type":"taxi","line":null},{"a":27,"b":28,"type":"taxi","line":null},{"a":27,"b":37,"type":"taxi","line":null},{"a":27,"b":36,"type":"taxi","line":null},{"a":27,"b":8,"type":"taxi","line":null},{"a":28,"b":37,"type":"taxi","line":null},{"a":28,"b":8,"type":"taxi","line":null},{"a":28,"b":47,"type":"taxi","line":null},{"a":28,"b":26,"type":"taxi","line":null},{"a":29,"b":30,"type":"taxi","line":null},{"a":29,"b":38,"type":"taxi","line":null},{"a":29,"b":39,"type":"taxi","line":null},{"a":29,"b":31,"type":"taxi","line":null},{"a":30,"b":39,"type":"taxi","line":null},{"a":30,"b":31,"type":"taxi","line":null},{"a":30,"b":38,"type":"taxi","line":null},{"a":30,"b":40,"type":"taxi","line":null},{"a":31,"b":40,"type":"taxi","line":null},{"a":31,"b":39,"type":"taxi","line":null},{"a":31,"b":41,"type":"taxi","line":null},{"a":31,"b":32,"type":"taxi","line":null},{"a":32,"b":41,"type":"taxi","line":null},{"a":32,"b":33,"type":"taxi","line":null},{"a":32,"b":40,"type":"taxi","line":null},{"a":32,"b":42,"type":"taxi","line":null},{"a":33,"b":34,"type":"taxi","line":null},{"a":33,"b":42,"type":"taxi","line":null},{"a":33,"b":14,"type":"taxi","line":null},{"a":33,"b":43,"type":"taxi","line":null},{"a":34,"b":43,"type":"taxi","line":null},{"a":34,"b":42,"type":"taxi","line":null},{"a":34,"b":35,"type":"taxi","line":null},{"a":34,"b":44,"type":"taxi","line":null},{"a":35,"b":44,"type":"taxi","line":null},{"a":35,"b":36,"type":"taxi","line":null},{"a":35,"b":45,"type":"taxi","line":null},{"a":35,"b":43,"type":"taxi","line":null},{"a":36,"b":37,"type":"taxi","line":null},{"a":36,"b":45,"type":"taxi","line":null},{"a":36,"b":46,"type":"taxi","line":null},{"a":36,"b":44,"type":"taxi","line":null},{"a":37,"b":46,"type":"taxi","line":null},{"a":37,"b":45,"type":"taxi","line":null},{"a":37,"b":47,"type":"taxi","line":null},{"a":37,"b":55,"type":"taxi","line":null},{"a":38,"b":48,"type":"taxi","line":null},{"a":38,"b":39,"type":"taxi","line":null},{"a":38,"b":49,"type":"taxi","line":null},{"a":38,"b":57,"type":"taxi","line":null},{"a":39,"b":49,"type":"taxi","line":null},{"a":39,"b":40,"type":"taxi","line":null},{"a":39,"b":48,"type":"taxi","line":null},{"a":39,"b":50,"type":"taxi","line":null},{"a":40,"b":50,"type":"taxi","line":null},{"a":40,"b":41,"type":"taxi","line":null},{"a":40,"b":49,"type":"taxi","line":null},{"a":40,"b":51,"type":"taxi","line":null},{"a":41,"b":50,"type":"taxi","line":null},{"a":41,"b":51,"type":"taxi","line":null},{"a":41,"b":33,"type":"taxi","line":null},{"a":41,"b":52,"type":"taxi","line":null},{"a":42,"b":43,"type":"taxi","line":null},{"a":42,"b":53,"type":"taxi","line":null},{"a":42,"b":52,"type":"taxi","line":null},{"a":42,"b":61,"type":"taxi","line":null},{"a":43,"b":44,"type":"taxi","line":null},{"a":43,"b":53,"type":"taxi","line":null},{"a":43,"b":23,"type":"taxi","line":null},{"a":43,"b":62,"type":"taxi","line":null},{"a":44,"b":45,"type":"taxi","line":null},{"a":44,"b":53,"type":"taxi","line":null},{"a":44,"b":63,"type":"taxi","line":null},{"a":44,"b":54,"type":"taxi","line":null},{"a":45,"b":54,"type":"taxi","line":null},{"a":45,"b":46,"type":"taxi","line":null},{"a":45,"b":64,"type":"taxi","line":null},{"a":45,"b":55,"type":"taxi","line":null},{"a":46,"b":55,"type":"taxi","line":null},{"a":46,"b":54,"type":"taxi","line":null},{"a":46,"b":47,"type":"taxi","line":null},{"a":46,"b":64,"type":"taxi","line":null},{"a":47,"b":56,"type":"taxi","line":null},{"a":47,"b":55,"type":"taxi","line":null},{"a":47,"b":27,"type":"taxi","line":null},{"a":47,"b":65,"type":"taxi","line":null},{"a":48,"b":49,"type":"taxi","line":null},{"a":48,"b":57,"type":"taxi","line":null},{"a":48,"b":58,"type":"taxi","line":null},{"a":48,"b":29,"type":"taxi","line":null},{"a":49,"b":58,"type":"taxi","line":null},{"a":49,"b":59,"type":"taxi","line":null},{"a":49,"b":50,"type":"taxi","line":null},{"a":49,"b":57,"type":"taxi","line":null},{"a":50,"b":51,"type":"taxi","line":null},{"a":50,"b":59,"type":"taxi","line":null},{"a":50,"b":60,"type":"taxi","line":null},{"a":50,"b":31,"type":"taxi","line":null},{"a":51,"b":60,"type":"taxi","line":null},{"a":51,"b":52,"type":"taxi","line":null},{"a":51,"b":59,"type":"taxi","line":null},{"a":51,"b":61,"type":"taxi","line":null},{"a":52,"b":61,"type":"taxi","line":null},{"a":52,"b":60,"type":"taxi","line":null},{"a":52,"b":53,"type":"taxi","line":null},{"a":52,"b":70,"type":"taxi","line":null},{"a":53,"b":62,"type":"taxi","line":null},{"a":53,"b":61,"type":"taxi","line":null},{"a":53,"b":63,"type":"taxi","line":null},{"a":53,"b":34,"type":"taxi","line":null},{"a":54,"b":64,"type":"taxi","line":null},{"a":54,"b":55,"type":"taxi","line":null},{"a":54,"b":65,"type":"taxi","line":null},{"a":54,"b":73,"type":"taxi","line":null},{"a":55,"b":65,"type":"taxi","line":null},{"a":55,"b":56,"type":"taxi","line":null},{"a":55,"b":64,"type":"taxi","line":null},{"a":55,"b":66,"type":"taxi","line":null},{"a":56,"b":66,"type":"taxi","line":null},{"a":56,"b":65,"type":"taxi","line":null},{"a":56,"b":46,"type":"taxi","line":null},{"a":56,"b":75,"type":"taxi","line":null},{"a":57,"b":67,"type":"taxi","line":null},{"a":57,"b":58,"type":"taxi","line":null},{"a":57,"b":68,"type":"taxi","line":null},{"a":57,"b":76,"type":"taxi","line":null},{"a":58,"b":59,"type":"taxi","line":null},{"a":58,"b":68,"type":"taxi","line":null},{"a":58,"b":69,"type":"taxi","line":null},{"a":58,"b":77,"type":"taxi","line":null},{"a":59,"b":69,"type":"taxi","line":null},{"a":59,"b":68,"type":"taxi","line":null},{"a":59,"b":40,"type":"taxi","line":null},{"a":59,"b":78,"type":"taxi","line":null},{"a":60,"b":61,"type":"taxi","line":null},{"a":60,"b":70,"type":"taxi","line":null},{"a":60,"b":59,"type":"taxi","line":null},{"a":60,"b":69,"type":"taxi","line":null},{"a":61,"b":70,"type":"taxi","line":null},{"a":61,"b":62,"type":"taxi","line":null},{"a":61,"b":71,"type":"taxi","line":null},{"a":61,"b":80,"type":"taxi","line":null},{"a":62,"b":63,"type":"taxi","line":null},{"a":62,"b":71,"type":"taxi","line":null},{"a":62,"b":70,"type":"taxi","line":null},{"a":62,"b":72,"type":"taxi","line":null},{"a":63,"b":72,"type":"taxi","line":null},{"a":63,"b":73,"type":"taxi","line":null},{"a":63,"b":64,"type":"taxi","line":null},{"a":63,"b":71,"type":"taxi","line":null},{"a":64,"b":73,"type":"taxi","line":null},{"a":64,"b":65,"type":"taxi","line":null},{"a":64,"b":74,"type":"taxi","line":null},{"a":64,"b":83,"type":"taxi","line":null},{"a":65,"b":66,"type":"taxi","line":null},{"a":65,"b":74,"type":"taxi","line":null},{"a":65,"b":75,"type":"taxi","line":null},{"a":65,"b":46,"type":"taxi","line":null},{"a":66,"b":75,"type":"taxi","line":null},{"a":66,"b":85,"type":"taxi","line":null},{"a":66,"b":74,"type":"taxi","line":null},{"a":66,"b":47,"type":"taxi","line":null},{"a":67,"b":76,"type":"taxi","line":null},{"a":67,"b":77,"type":"taxi","line":null},{"a":67,"b":68,"type":"taxi","line":null},{"a":67,"b":58,"type":"taxi","line":null},{"a":68,"b":77,"type":"taxi","line":null},{"a":68,"b":78,"type":"taxi","line":null},{"a":68,"b":69,"type":"taxi","line":null},{"a":68,"b":86,"type":"taxi","line":null},{"a":69,"b":78,"type":"taxi","line":null},{"a":69,"b":77,"type":"taxi","line":null},{"a":69,"b":79,"type":"taxi","line":null},{"a":69,"b":51,"type":"taxi","line":null},{"a":70,"b":71,"type":"taxi","line":null},{"a":70,"b":80,"type":"taxi","line":null},{"a":70,"b":81,"type":"taxi","line":null},{"a":70,"b":79,"type":"taxi","line":null},{"a":71,"b":81,"type":"taxi","line":null},{"a":71,"b":80,"type":"taxi","line":null},{"a":71,"b":72,"type":"taxi","line":null},{"a":71,"b":90,"type":"taxi","line":null},{"a":72,"b":82,"type":"taxi","line":null},{"a":72,"b":83,"type":"taxi","line":null},{"a":72,"b":73,"type":"taxi","line":null},{"a":72,"b":81,"type":"taxi","line":null},{"a":73,"b":83,"type":"taxi","line":null},{"a":73,"b":74,"type":"taxi","line":null},{"a":73,"b":82,"type":"taxi","line":null},{"a":73,"b":65,"type":"taxi","line":null},{"a":74,"b":84,"type":"taxi","line":null},{"a":74,"b":83,"type":"taxi","line":null},{"a":74,"b":75,"type":"taxi","line":null},{"a":74,"b":93,"type":"taxi","line":null},{"a":75,"b":85,"type":"taxi","line":null},{"a":75,"b":94,"type":"taxi","line":null},{"a":75,"b":84,"type":"taxi","line":null},{"a":76,"b":77,"type":"taxi","line":null},{"a":76,"b":86,"type":"taxi","line":null},{"a":76,"b":95,"type":"taxi","line":null},{"a":76,"b":68,"type":"taxi","line":null},{"a":77,"b":86,"type":"taxi","line":null},{"a":77,"b":78,"type":"taxi","line":null},{"a":77,"b":57,"type":"taxi","line":null},{"a":77,"b":59,"type":"taxi","line":null},{"a":78,"b":86,"type":"taxi","line":null},{"a":78,"b":87,"type":"taxi","line":null},{"a":78,"b":79,"type":"taxi","line":null},{"a":78,"b":88,"type":"taxi","line":null},{"a":79,"b":88,"type":"taxi","line":null},{"a":79,"b":80,"type":"taxi","line":null},{"a":79,"b":89,"type":"taxi","line":null},{"a":79,"b":87,"type":"taxi","line":null},{"a":80,"b":81,"type":"taxi","line":null},{"a":80,"b":89,"type":"taxi","line":null},{"a":80,"b":90,"type":"taxi","line":null},{"a":80,"b":88,"type":"taxi","line":null},{"a":81,"b":90,"type":"taxi","line":null},{"a":81,"b":89,"type":"taxi","line":null},{"a":81,"b":82,"type":"taxi","line":null},{"a":81,"b":91,"type":"taxi","line":null},{"a":82,"b":83,"type":"taxi","line":null},{"a":82,"b":91,"type":"taxi","line":null},{"a":82,"b":92,"type":"taxi","line":null},{"a":82,"b":71,"type":"taxi","line":null},{"a":83,"b":92,"type":"taxi","line":null},{"a":83,"b":84,"type":"taxi","line":null},{"a":83,"b":93,"type":"taxi","line":null},{"a":83,"b":91,"type":"taxi","line":null},{"a":84,"b":93,"type":"taxi","line":null},{"a":84,"b":85,"type":"taxi","line":null},{"a":84,"b":102,"type":"taxi","line":null},{"a":84,"b":92,"type":"taxi","line":null},{"a":85,"b":94,"type":"taxi","line":null},{"a":85,"b":103,"type":"taxi","line":null},{"a":85,"b":93,"type":"taxi","line":null},{"a":85,"b":74,"type":"taxi","line":null},{"a":86,"b":96,"type":"taxi","line":null},{"a":86,"b":87,"type":"taxi","line":null},{"a":86,"b":95,"type":"taxi","line":null},{"a":86,"b":97,"type":"taxi","line":null},{"a":87,"b":88,"type":"taxi","line":null},{"a":87,"b":97,"type":"taxi","line":null},{"a":87,"b":98,"type":"taxi","line":null},{"a":87,"b":106,"type":"taxi","line":null},{"a":88,"b":98,"type":"taxi","line":null},{"a":88,"b":97,"type":"taxi","line":null},{"a":88,"b":89,"type":"taxi","line":null},{"a":88,"b":99,"type":"taxi","line":null},{"a":89,"b":99,"type":"taxi","line":null},{"a":89,"b":90,"type":"taxi","line":null},{"a":89,"b":100,"type":"taxi","line":null},{"a":89,"b":98,"type":"taxi","line":null},{"a":90,"b":100,"type":"taxi","line":null},{"a":90,"b":91,"type":"taxi","line":null},{"a":90,"b":99,"type":"taxi","line":null},{"a":90,"b":109,"type":"taxi","line":null},{"a":91,"b":101,"type":"taxi","line":null},{"a":91,"b":92,"type":"taxi","line":null},{"a":91,"b":110,"type":"taxi","line":null},{"a":91,"b":100,"type":"taxi","line":null},{"a":92,"b":93,"type":"taxi","line":null},{"a":92,"b":102,"type":"taxi","line":null},{"a":92,"b":101,"type":"taxi","line":null},{"a":92,"b":111,"type":"taxi","line":null},{"a":93,"b":102,"type":"taxi","line":null},{"a":93,"b":103,"type":"taxi","line":null},{"a":93,"b":94,"type":"taxi","line":null},{"a":93,"b":111,"type":"taxi","line":null},{"a":94,"b":103,"type":"taxi","line":null},{"a":94,"b":84,"type":"taxi","line":null},{"a":94,"b":102,"type":"taxi","line":null},{"a":94,"b":113,"type":"taxi","line":null},{"a":95,"b":104,"type":"taxi","line":null},{"a":95,"b":96,"type":"taxi","line":null},{"a":95,"b":105,"type":"taxi","line":null},{"a":95,"b":114,"type":"taxi","line":null},{"a":96,"b":105,"type":"taxi","line":null},{"a":96,"b":104,"type":"taxi","line":null},{"a":96,"b":106,"type":"taxi","line":null},{"a":96,"b":97,"type":"taxi","line":null},{"a":97,"b":98,"type":"taxi","line":null},{"a":97,"b":106,"type":"taxi","line":null},{"a":97,"b":107,"type":"taxi","line":null},{"a":97,"b":116,"type":"taxi","line":null},{"a":98,"b":107,"type":"taxi","line":null},{"a":98,"b":106,"type":"taxi","line":null},{"a":98,"b":99,"type":"taxi","line":null},{"a":98,"b":117,"type":"taxi","line":null},{"a":99,"b":100,"type":"taxi","line":null},{"a":99,"b":108,"type":"taxi","line":null},{"a":99,"b":107,"type":"taxi","line":null},{"a":99,"b":109,"type":"taxi","line":null},{"a":100,"b":109,"type":"taxi","line":null},{"a":100,"b":108,"type":"taxi","line":null},{"a":100,"b":81,"type":"taxi","line":null},{"a":100,"b":101,"type":"taxi","line":null},{"a":101,"b":110,"type":"taxi","line":null},{"a":101,"b":111,"type":"taxi","line":null},{"a":101,"b":119,"type":"taxi","line":null},{"a":101,"b":109,"type":"taxi","line":null},{"a":102,"b":112,"type":"taxi","line":null},{"a":102,"b":103,"type":"taxi","line":null},{"a":102,"b":111,"type":"taxi","line":null},{"a":102,"b":113,"type":"taxi","line":null},{"a":103,"b":113,"type":"taxi","line":null},{"a":103,"b":112,"type":"taxi","line":null},{"a":103,"b":84,"type":"taxi","line":null},{"a":103,"b":122,"type":"taxi","line":null},{"a":104,"b":114,"type":"taxi","line":null},{"a":104,"b":105,"type":"taxi","line":null},{"a":104,"b":115,"type":"taxi","line":null},{"a":105,"b":115,"type":"taxi","line":null},{"a":105,"b":114,"type":"taxi","line":null},{"a":105,"b":106,"type":"taxi","line":null},{"a":105,"b":116,"type":"taxi","line":null},{"a":106,"b":116,"type":"taxi","line":null},{"a":106,"b":107,"type":"taxi","line":null},{"a":106,"b":115,"type":"taxi","line":null},{"a":106,"b":117,"type":"taxi","line":null},{"a":107,"b":117,"type":"taxi","line":null},{"a":107,"b":108,"type":"taxi","line":null},{"a":107,"b":116,"type":"taxi","line":null},{"a":107,"b":88,"type":"taxi","line":null},{"a":108,"b":117,"type":"taxi","line":null},{"a":108,"b":109,"type":"taxi","line":null},{"a":108,"b":118,"type":"taxi","line":null},{"a":108,"b":98,"type":"taxi","line":null},{"a":109,"b":118,"type":"taxi","line":null},{"a":109,"b":119,"type":"taxi","line":null},{"a":109,"b":110,"type":"taxi","line":null},{"a":109,"b":91,"type":"taxi","line":null},{"a":110,"b":111,"type":"taxi","line":null},{"a":110,"b":119,"type":"taxi","line":null},{"a":110,"b":120,"type":"taxi","line":null},{"a":110,"b":92,"type":"taxi","line":null},{"a":111,"b":120,"type":"taxi","line":null},{"a":111,"b":119,"type":"taxi","line":null},{"a":111,"b":112,"type":"taxi","line":null},{"a":111,"b":91,"type":"taxi","line":null},{"a":112,"b":121,"type":"taxi","line":null},{"a":112,"b":113,"type":"taxi","line":null},{"a":112,"b":120,"type":"taxi","line":null},{"a":112,"b":122,"type":"taxi","line":null},{"a":113,"b":122,"type":"taxi","line":null},{"a":113,"b":121,"type":"taxi","line":null},{"a":114,"b":115,"type":"taxi","line":null},{"a":114,"b":96,"type":"taxi","line":null},{"a":114,"b":116,"type":"taxi","line":null},{"a":115,"b":116,"type":"taxi","line":null},{"a":115,"b":96,"type":"taxi","line":null},{"a":116,"b":117,"type":"taxi","line":null},{"a":116,"b":98,"type":"taxi","line":null},{"a":116,"b":96,"type":"taxi","line":null},{"a":117,"b":99,"type":"taxi","line":null},{"a":117,"b":97,"type":"taxi","line":null},{"a":117,"b":118,"type":"taxi","line":null},{"a":117,"b":109,"type":"taxi","line":null},{"a":118,"b":119,"type":"taxi","line":null},{"a":118,"b":110,"type":"taxi","line":null},{"a":118,"b":100,"type":"taxi","line":null},{"a":119,"b":120,"type":"taxi","line":null},{"a":120,"b":121,"type":"taxi","line":null},{"a":120,"b":101,"type":"taxi","line":null},{"a":121,"b":122,"type":"taxi","line":null},{"a":121,"b":111,"type":"taxi","line":null},{"a":121,"b":102,"type":"taxi","line":null},{"a":121,"b":103,"type":"taxi","line":null},{"a":101,"b":81,"type":"bus","line":"C1"},{"a":81,"b":52,"type":"bus","line":"C1"},{"a":52,"b":40,"type":"bus","line":"C1"},{"a":40,"b":38,"type":"bus","line":"C1"},{"a":38,"b":10,"type":"bus","line":"C1"},{"a":10,"b":39,"type":"bus","line":"C1"},{"a":39,"b":41,"type":"bus","line":"C1"},{"a":41,"b":34,"type":"bus","line":"C1"},{"a":34,"b":45,"type":"bus","line":"C1"},{"a":98,"b":80,"type":"bus","line":"C2"},{"a":80,"b":63,"type":"bus","line":"C2"},{"a":63,"b":74,"type":"bus","line":"C2"},{"a":74,"b":103,"type":"bus","line":"C2"},{"a":103,"b":121,"type":"bus","line":"C2"},{"a":121,"b":119,"type":"bus","line":"C2"},{"a":119,"b":91,"type":"bus","line":"C2"},{"a":91,"b":89,"type":"bus","line":"C2"},{"a":89,"b":117,"type":"bus","line":"C2"},{"a":69,"b":52,"type":"bus","line":"C3"},{"a":52,"b":34,"type":"bus","line":"C3"},{"a":34,"b":16,"type":"bus","line":"C3"},{"a":16,"b":8,"type":"bus","line":"C3"},{"a":8,"b":25,"type":"bus","line":"C3"},{"a":25,"b":23,"type":"bus","line":"C3"},{"a":23,"b":41,"type":"bus","line":"C3"},{"a":41,"b":30,"type":"bus","line":"C3"},{"a":30,"b":1,"type":"bus","line":"C3"},{"a":38,"b":58,"type":"bus","line":"C4"},{"a":58,"b":86,"type":"bus","line":"C4"},{"a":86,"b":98,"type":"bus","line":"C4"},{"a":98,"b":90,"type":"bus","line":"C4"},{"a":90,"b":83,"type":"bus","line":"C4"},{"a":83,"b":65,"type":"bus","line":"C4"},{"a":65,"b":45,"type":"bus","line":"C4"},{"a":45,"b":47,"type":"bus","line":"C5"},{"a":47,"b":19,"type":"bus","line":"C5"},{"a":19,"b":26,"type":"bus","line":"C5"},{"a":26,"b":44,"type":"bus","line":"C5"},{"a":44,"b":52,"type":"bus","line":"C5"},{"a":69,"b":67,"type":"bus","line":"C5"},{"a":67,"b":38,"type":"bus","line":"C5"},{"a":80,"b":87,"type":"bus","line":"C6"},{"a":87,"b":105,"type":"bus","line":"C6"},{"a":105,"b":98,"type":"bus","line":"C6"},{"a":63,"b":52,"type":"bus","line":"C7"},{"a":46,"b":28,"type":"bus","line":"C8"},{"a":28,"b":56,"type":"bus","line":"C8"},{"a":56,"b":64,"type":"bus","line":"C8"},{"a":64,"b":82,"type":"bus","line":"C8"},{"a":82,"b":110,"type":"bus","line":"C8"},{"a":110,"b":121,"type":"bus","line":"C8"},{"a":91,"b":80,"type":"bus","line":"C8"},{"a":25,"b":47,"type":"tram","line":"T1"},{"a":47,"b":84,"type":"tram","line":"T1"},{"a":84,"b":120,"type":"tram","line":"T1"},{"a":120,"b":108,"type":"tram","line":"T1"},{"a":108,"b":115,"type":"tram","line":"T1"},{"a":115,"b":76,"type":"tram","line":"T1"},{"a":76,"b":39,"type":"tram","line":"T1"},{"a":39,"b":2,"type":"tram","line":"T1"},{"a":2,"b":14,"type":"tram","line":"T1"},{"a":101,"b":63,"type":"tram","line":"T2"},{"a":63,"b":33,"type":"tram","line":"T2"},{"a":33,"b":3,"type":"tram","line":"T2"},{"a":3,"b":39,"type":"tram","line":"T2"},{"a":76,"b":114,"type":"tram","line":"T2"},{"a":114,"b":107,"type":"tram","line":"T2"},{"a":107,"b":91,"type":"tram","line":"T2"},{"a":91,"b":121,"type":"tram","line":"T2"},{"a":91,"b":61,"type":"tram","line":"T3"},{"a":61,"b":31,"type":"tram","line":"T3"},{"a":31,"b":1,"type":"tram","line":"T3"},{"a":1,"b":39,"type":"tram","line":"T3"},{"a":39,"b":78,"type":"tram","line":"T3"},{"a":78,"b":116,"type":"tram","line":"T3"},{"a":116,"b":109,"type":"tram","line":"T3"},{"a":109,"b":102,"type":"tram","line":"T3"},{"a":95,"b":69,"type":"tram","line":"T4"},{"a":69,"b":53,"type":"tram","line":"T4"},{"a":53,"b":46,"type":"tram","line":"T4"},{"a":46,"b":8,"type":"tram","line":"T4"},{"a":8,"b":35,"type":"tram","line":"T4"},{"a":35,"b":61,"type":"tram","line":"T4"},{"a":61,"b":87,"type":"tram","line":"T4"},{"a":87,"b":114,"type":"tram","line":"T4"},{"a":56,"b":18,"type":"tram","line":"T5"},{"a":18,"b":34,"type":"tram","line":"T5"},{"a":34,"b":31,"type":"tram","line":"T5"},{"a":31,"b":57,"type":"tram","line":"T5"},{"a":57,"b":95,"type":"tram","line":"T5"},{"a":95,"b":107,"type":"tram","line":"T5"},{"a":107,"b":110,"type":"tram","line":"T5"},{"a":110,"b":113,"type":"tram","line":"T5"},{"a":113,"b":83,"type":"tram","line":"T5"},{"a":57,"b":20,"type":"tram","line":"T6"},{"a":20,"b":3,"type":"tram","line":"T6"},{"a":33,"b":45,"type":"tram","line":"T6"},{"a":45,"b":84,"type":"tram","line":"T6"},{"a":28,"b":53,"type":"metro","line":"A"},{"a":53,"b":109,"type":"metro","line":"A"},{"a":109,"b":115,"type":"metro","line":"A"},{"a":115,"b":69,"type":"metro","line":"A"},{"a":69,"b":13,"type":"metro","line":"A"},{"a":13,"b":7,"type":"metro","line":"A"},{"a":7,"b":56,"type":"metro","line":"A"},{"a":56,"b":103,"type":"metro","line":"A"},{"a":42,"b":87,"type":"metro","line":"B"},{"a":87,"b":63,"type":"metro","line":"B"},{"a":63,"b":28,"type":"metro","line":"B"},{"a":33,"b":8,"type":"metro","line":"C"},{"a":8,"b":65,"type":"metro","line":"C"},{"a":65,"b":109,"type":"metro","line":"C"},{"a":15,"b":72,"type":"metro","line":"D"},{"a":72,"b":118,"type":"metro","line":"D"},{"a":118,"b":115,"type":"metro","line":"D"},{"a":22,"b":31,"type":"boat","line":"Vaporetto Saône"},{"a":3,"b":22,"type":"boat","line":"Vaporetto Saône"},{"a":22,"b":40,"type":"boat","line":"Vaporetto Saône"},{"a":59,"b":88,"type":"boat","line":"Vaporetto Saône"},{"a":88,"b":106,"type":"boat","line":"Vaporetto Saône"},{"a":44,"b":62,"type":"boat","line":"Vaporetto Rhône"},{"a":100,"b":119,"type":"boat","line":"Vaporetto Rhône"},{"a":15,"b":34,"type":"boat","line":"Vaporetto Rhône"},{"a":53,"b":71,"type":"boat","line":"Vaporetto Rhône"},{"a":71,"b":91,"type":"boat","line":"Vaporetto Rhône"},{"a":91,"b":118,"type":"boat","line":"Vaporetto Rhône"}],"rivers":[{"name":"Saône","pts":[[313,17],[325,110],[329,203],[324,295],[311,388],[296,481],[283,574],[277,667],[280,759],[291,852],[306,945]]},{"name":"Rhône","pts":[[550,17],[542,110],[527,203],[509,295],[495,388],[490,481],[495,574],[509,667],[526,759],[542,852],[550,945]]}],"startCards":[1,29,5,57,23,33,51,95,43,35,79,88,115,98,54,55,108,109,110,85]};

/* ===================== CONSTANTES DE RÈGLES ===================== */
const TOTAL_ROUNDS = 22;            // règles Budapest fournies
const REVEALS = [3, 8, 13, 18];     // tours où Mister X se montre
const DET_TICKETS = { taxi: 10, bus: 8, tram: 6, metro: 2 };
const DET_COLORS = ["#38bdf8", "#22c55e", "#f59e0b", "#a855f7", "#fb7185"];
const LINE_COLORS = { A: "#e2231a", B: "#0072bc", C: "#f58220", D: "#00a04a" };
const TYPE_COLORS = { taxi: "#caa84a", bus: "#7a8b99", tram: "#5bc2e7", metro: "#e2231a", boat: "#60a5fa" };
const TYPE_LABEL = { taxi: "Taxi", bus: "Bus", tram: "Tram", metro: "Métro", black: "Ticket noir", boat: "Navette" };
const TYPE_ICON = { taxi: "🚕", bus: "🚌", tram: "🚊", metro: "Ⓜ", black: "⬛", boat: "⛴" };

/* ===================== ADJACENCE ===================== */
const ADJ = {};
const NODE = {};
BOARD.nodes.forEach((n) => { ADJ[n.id] = []; NODE[n.id] = n; });
BOARD.edges.forEach((e) => {
  ADJ[e.a].push({ to: e.b, type: e.type, line: e.line });
  ADJ[e.b].push({ to: e.a, type: e.type, line: e.line });
});

/* ===================== STOCKAGE (multijoueur) ===================== */
// Version web : etat partage via /api/room (Upstash Redis), identite via localStorage.
const STORAGE_OK = true;
async function sget(key, shared) {
  if (shared) {
    try { const r = await fetch("/api/room?key=" + encodeURIComponent(key)); if (!r.ok) return null; const j = await r.json(); return j.value ?? null; }
    catch (e) { return null; }
  }
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null; } catch (e) { return null; }
}
async function sset(key, val, shared) {
  if (shared) {
    try { await fetch("/api/room", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ key, value: val }) }); return true; }
    catch (e) { return false; }
  }
  try { localStorage.setItem(key, JSON.stringify(val)); return true; } catch (e) { return false; }
}

/* ===================== UTILITAIRES ===================== */
const rid = (n = 4) => { const a = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; let s = ""; for (let i = 0; i < n; i++) s += a[Math.floor(Math.random() * a.length)]; return s; };
const clone = (o) => JSON.parse(JSON.stringify(o));
const occupiedNodes = (dets, exceptId) => new Set(dets.filter((d) => d.id !== exceptId).map((d) => d.pos));

function detectiveMoves(pos, tickets, occupied) {
  const out = {}; // to -> [types]
  for (const e of ADJ[pos]) {
    if (e.type === "boat") continue;
    if ((tickets[e.type] || 0) > 0 && !occupied.has(e.to)) (out[e.to] ||= new Set()).add(e.type);
  }
  const r = {}; for (const k in out) r[k] = [...out[k]]; return r;
}
function xMoves(pos, detPos, hasBlack) {
  const normal = {}, black = {};
  for (const e of ADJ[pos]) {
    if (detPos.has(e.to)) continue;
    if (e.type !== "boat") (normal[e.to] ||= new Set()).add(e.type);
    if (hasBlack) (black[e.to] ||= new Set()).add(e.type);
  }
  const conv = (m) => { const r = {}; for (const k in m) r[k] = [...m[k]]; return r; };
  return { normal: conv(normal), black: conv(black) };
}

/* ===================== INITIALISATION DE PARTIE ===================== */
function startGame(state) {
  let dPlayers = state.players.filter((p) => p.role === "detective");
  let xPlayer = state.players.find((p) => p.role === "mrx");
  if (state.mode === "hotseat" && state.players.length > 0 && (!xPlayer || dPlayers.length === 0)) {
    xPlayer = xPlayer || state.players[0];
    dPlayers = dPlayers.length > 0 ? dPlayers : [state.players[0]];
  }
  if (!xPlayer || dPlayers.length === 0) return null;
  const P = Math.max(2, Math.min(5, state.config.detectivePawns));
  const cards = [...BOARD.startCards].sort(() => Math.random() - 0.5);
  // X start
  const xStart = cards.shift();
  const dets = [];
  for (let i = 0; i < P; i++) {
    const owner = dPlayers[i % dPlayers.length];
    dets.push({
      id: "d" + (i + 1), owner: owner.id, label: String(i + 1),
      color: DET_COLORS[i % DET_COLORS.length],
      pos: cards[i], tickets: { ...DET_TICKETS }, moved: false,
    });
  }
  state.phase = "playing";
  state.round = 1;
  state.turn = "mrx";
  state.mrx = { pos: xStart, start: xStart, revealedPos: null, revealedRound: null, log: [], tickets: { black: P, x2: P }, doubleActive: false };
  state.detectives = dets;
  state.result = null;
  state.message = "Mister X commence. Il se déplace en secret.";
  return state;
}

/* ===================== RÉSOLUTION DE TOUR ===================== */
function endXTurn(state) {
  if (REVEALS.includes(state.round)) { state.mrx.revealedPos = state.mrx.pos; state.mrx.revealedRound = state.round; }
  state.turn = "detectives";
  state.detectives.forEach((d) => (d.moved = false));
  state.message = "Aux détectives de jouer.";
}
function afterDetectiveMove(state, pawn) {
  if (pawn.pos === state.mrx.pos) {
    state.phase = "over";
    state.result = { winner: "detectives", reason: "Arrestation ! Un détective a mis la main sur Mister X." };
    return state;
  }
  pawn.moved = true;
  return advanceIfDone(state);
}
function advanceIfDone(state) {
  // pions encore mobiles ce tour
  const remaining = state.detectives.filter((d) => {
    if (d.moved) return false;
    const occ = occupiedNodes(state.detectives, d.id);
    return Object.keys(detectiveMoves(d.pos, d.tickets, occ)).length > 0;
  });
  if (remaining.length > 0) { state.message = "Aux détectives de jouer."; return state; }
  // fin de la phase détectives
  const totalTickets = state.detectives.reduce((s, d) => s + d.tickets.taxi + d.tickets.bus + d.tickets.tram + d.tickets.metro, 0);
  if (totalTickets === 0) {
    state.phase = "over";
    state.result = { winner: "mrx", reason: "Panne sèche ! Les détectives n'ont plus aucun ticket." };
    return state;
  }
  if (state.round >= TOTAL_ROUNDS) {
    state.phase = "over";
    state.result = { winner: "mrx", reason: `Échappée belle ! Mister X a survécu aux ${TOTAL_ROUNDS} tours.` };
    return state;
  }
  state.round += 1;
  state.turn = "mrx";
  state.mrx.doubleActive = false;
  state.detectives.forEach((d) => (d.moved = false));
  state.message = "Nouveau tour : Mister X se déplace.";
  return state;
}

/* ===================== COMPOSANT PRINCIPAL ===================== */
export default function App() {
  const [myId, setMyId] = useState(null);
  const [name, setName] = useState("");
  const [screen, setScreen] = useState("home"); // home | lobby | game
  const [mode, setMode] = useState("online");    // online | hotseat
  const [code, setCode] = useState("");
  const [state, setState] = useState(null);
  const localV = useRef(0);
  const roomKey = code ? "sylyon_room_" + code : null;

  // identité persistante
  useEffect(() => {
    (async () => {
      let pid = await sget("sylyon_myid", false);
      if (!pid) { pid = rid(8); await sset("sylyon_myid", pid, false); }
      setMyId(pid);
      const savedName = await sget("sylyon_name", false);
      if (savedName) setName(savedName);
    })();
  }, []);

  // polling en ligne
  useEffect(() => {
    if (mode !== "online" || !roomKey || screen === "home") return;
    let alive = true;
    const tick = async () => {
      const s = await sget(roomKey, true);
      if (alive && s && (s.v || 0) >= localV.current) { localV.current = s.v || 0; setState(s); }
    };
    tick();
    const iv = setInterval(tick, 2500);
    return () => { alive = false; clearInterval(iv); };
  }, [mode, roomKey, screen]);

  const commit = useCallback(async (mut) => {
    if (mode === "online" && roomKey) {
      const fresh = (await sget(roomKey, true)) || state;
      const next = mut(clone(fresh));
      if (!next) return false;
      next.v = (fresh?.v || 0) + 1;
      await sset(roomKey, next, true);
      localV.current = next.v;
      setState(next);
      return true;
    } else {
      const next = mut(clone(state));
      if (!next) return false;
      next.v = (state?.v || 0) + 1;
      setState(next);
      return true;
    }
  }, [mode, roomKey, state]);

  /* ---------- HOME ---------- */
  const createRoom = async () => {
    if (!name.trim()) return;
    await sset("sylyon_name", name.trim(), false);
    const c = rid(4);
    const init = {
      v: 1, phase: "lobby", hostId: myId, mode,
      config: { detectivePawns: 4 },
      players: [{ id: myId, name: name.trim(), role: null }],
    };
    if (mode === "online") { await sset("sylyon_room_" + c, init, true); }
    localV.current = 1;
    setCode(c); setState(init); setScreen("lobby");
  };
  const joinRoom = async () => {
    if (!name.trim() || !code.trim()) return;
    await sset("sylyon_name", name.trim(), false);
    const c = code.trim().toUpperCase();
    const s = await sget("sylyon_room_" + c, true);
    if (!s) { alert("Aucune partie trouvée avec ce code."); return; }
    if (!s.players.find((p) => p.id === myId)) {
      s.players.push({ id: myId, name: name.trim(), role: null });
      s.v = (s.v || 0) + 1;
      await sset("sylyon_room_" + c, s, true);
    }
    localV.current = s.v || 0;
    setCode(c); setMode("online"); setState(s); setScreen("lobby");
  };

  if (!myId) return <div className="min-h-screen bg-slate-950" />;
  if (screen === "home") return <Home {...{ name, setName, mode, setMode, code, setCode, createRoom, joinRoom }} />;
  if (!state) return <div className="min-h-screen bg-slate-950 text-slate-300 grid place-items-center">Chargement…</div>;
  if (state.phase === "lobby") return <Lobby {...{ state, myId, code, mode, commit, setScreen, startTheGame: () => commit((s) => startGame(s)) }} />;
  return <Game {...{ state, myId, mode, commit, code }} />;
}

/* ===================== ÉCRAN ACCUEIL ===================== */
function Home({ name, setName, mode, setMode, code, setCode, createRoom, joinRoom }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6"
      style={{ backgroundImage: "radial-gradient(circle at 30% 20%, rgba(226,35,26,0.10), transparent 45%), radial-gradient(circle at 75% 80%, rgba(0,114,188,0.12), transparent 45%)" }}>
      <div className="w-full max-w-md">
        <p className="text-[0.7rem] tracking-[0.45em] text-slate-400 uppercase mb-2">Dossier d'enquête · TCL</p>
        <h1 className="text-4xl font-black leading-none mb-1">SCOTLAND YARD</h1>
        <div className="flex items-center gap-2 mb-8">
          <span className="h-px flex-1 bg-slate-700" />
          <span className="text-[#e2231a] font-bold tracking-[0.3em] text-sm">LYON</span>
          <span className="h-px flex-1 bg-slate-700" />
        </div>

        <label className="block text-xs uppercase tracking-widest text-slate-400 mb-1">Votre nom</label>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex : Camille"
          className="w-full mb-5 bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-[#e2231a]" />

        <div className="grid grid-cols-2 gap-2 mb-6">
          <button onClick={() => setMode("online")} className={"rounded-lg py-2 text-sm font-semibold border " + (mode === "online" ? "bg-[#e2231a] border-[#e2231a] text-white" : "bg-slate-900 border-slate-700 text-slate-300")}>En ligne</button>
          <button onClick={() => setMode("hotseat")} className={"rounded-lg py-2 text-sm font-semibold border " + (mode === "hotseat" ? "bg-[#e2231a] border-[#e2231a] text-white" : "bg-slate-900 border-slate-700 text-slate-300")}>Même écran</button>
        </div>
        <p className="text-xs text-slate-500 mb-6 -mt-3">{mode === "online" ? "Chaque joueur sur son appareil. Partagez le lien de l'artifact + le code de partie." : "Un seul appareil, on se le passe. Idéal pour tester."}</p>

        <button onClick={createRoom} disabled={!name.trim()} className="w-full mb-4 bg-[#e2231a] disabled:opacity-40 hover:brightness-110 text-white font-bold py-3 rounded-lg">Créer une partie</button>

        {mode === "online" && (
          <div className="flex gap-2">
            <input value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="CODE" maxLength={4}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 tracking-[0.3em] text-center uppercase outline-none focus:border-[#0072bc]" />
            <button onClick={joinRoom} disabled={!name.trim() || code.length < 4} className="bg-[#0072bc] disabled:opacity-40 hover:brightness-110 text-white font-bold px-6 rounded-lg">Rejoindre</button>
          </div>
        )}
        {!STORAGE_OK && <p className="text-xs text-amber-400 mt-6">⚠ Le stockage partagé est indisponible ici : le mode « En ligne » ne synchronisera pas entre appareils. Utilisez « Même écran », ou ouvrez l'artifact partagé.</p>}
      </div>
    </div>
  );
}

/* ===================== LOBBY ===================== */
function Lobby({ state, myId, code, mode, commit, startTheGame }) {
  const isHost = state.hostId === myId;
  const xTaken = state.players.find((p) => p.role === "mrx");
  const dPlayers = state.players.filter((p) => p.role === "detective");
  const pickRole = (role) => commit((s) => {
    const me = s.players.find((p) => p.id === myId); if (!me) return null;
    if (role === "mrx" && s.players.some((p) => p.role === "mrx" && p.id !== myId)) return null;
    me.role = me.role === role ? null : role;
    return s;
  });
  const setPawns = (n) => commit((s) => { s.config.detectivePawns = n; return s; });
  const canStart = mode === "hotseat" || (xTaken && dPlayers.length >= 1);
  const copyCode = () => { try { navigator.clipboard.writeText(code); } catch (e) {} };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 flex justify-center">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-black mb-1">Salle d'attente</h1>
        {mode === "online" ? (
          <div className="flex items-center gap-3 mb-6">
            <span className="text-slate-400 text-sm">Code de partie</span>
            <button onClick={copyCode} className="text-2xl font-black tracking-[0.4em] bg-slate-900 border border-slate-700 rounded-lg px-4 py-1 hover:border-[#e2231a]">{code}</button>
            <span className="text-xs text-slate-500">(toucher pour copier)</span>
          </div>
        ) : <p className="text-slate-400 text-sm mb-6">Mode même écran — on se passe l'appareil à chaque tour. La sélection de rôle est optionnelle : vous contrôlerez tout.</p>}

        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 mb-4">
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-3">Joueurs ({state.players.length})</p>
          <ul className="space-y-2">
            {state.players.map((p) => (
              <li key={p.id} className="flex items-center justify-between">
                <span className="font-medium">{p.name}{p.id === myId && " (vous)"}{p.id === state.hostId && " 👑"}</span>
                <span className={"text-xs px-2 py-1 rounded-full font-semibold " + (p.role === "mrx" ? "bg-[#e2231a] text-white" : p.role === "detective" ? "bg-[#0072bc] text-white" : "bg-slate-800 text-slate-400")}>
                  {p.role === "mrx" ? "Mister X" : p.role === "detective" ? "Détective" : "—"}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <button onClick={() => pickRole("mrx")} disabled={xTaken && xTaken.id !== myId}
            className="rounded-xl py-4 font-bold border border-slate-700 bg-slate-900 disabled:opacity-30 hover:border-[#e2231a]">🕵️‍♂️ Être Mister X</button>
          <button onClick={() => pickRole("detective")}
            className="rounded-xl py-4 font-bold border border-slate-700 bg-slate-900 hover:border-[#0072bc]">👮 Être détective</button>
        </div>

        {isHost && (
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 mb-4">
            <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">Nombre de pions détectives</p>
            <div className="flex gap-2">
              {[2, 3, 4, 5].map((n) => (
                <button key={n} onClick={() => setPawns(n)} className={"flex-1 py-2 rounded-lg font-bold " + (state.config.detectivePawns === n ? "bg-[#0072bc] text-white" : "bg-slate-800 text-slate-300")}>{n}</button>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-2">Les pions sont répartis entre les joueurs détectives (un joueur peut en contrôler plusieurs).</p>
          </div>
        )}

        {isHost ? (
          <button onClick={startTheGame} disabled={!canStart} className="w-full bg-[#e2231a] disabled:opacity-40 hover:brightness-110 text-white font-bold py-3 rounded-xl">
            {canStart ? "Lancer la partie" : "Il faut 1 Mister X et au moins 1 détective"}
          </button>
        ) : <p className="text-center text-slate-400 text-sm">En attente du lancement par l'hôte…</p>}
      </div>
    </div>
  );
}

/* ===================== JEU ===================== */
function Game({ state, myId, mode, commit, code }) {
  const me = state.players.find((p) => p.id === myId);
  const amX = me?.role === "mrx" || (mode === "hotseat");
  const myPawns = state.detectives.filter((d) => mode === "hotseat" ? true : d.owner === myId);

  const [selPawn, setSelPawn] = useState(null);
  const [useBlack, setUseBlack] = useState(false);
  const [doubleMove, setDoubleMove] = useState(false);
  const [pendingTo, setPendingTo] = useState(null);
  const [zoom, setZoom] = useState(1400);
  const [hideX, setHideX] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef({ x: 0, y: 0, origX: 0, origY: 0 });
  const isPanningRef = useRef(false);
  const dragMoved = useRef(false);

  const isXTurn = state.turn === "mrx";
  const iControlX = me?.role === "mrx" || mode === "hotseat";
  const iControlDet = state.turn === "detectives" && (mode === "hotseat" || myPawns.length > 0);

  // Mister X voit sa vraie position ; les détectives jamais (sauf révélation)
  const showXTrue = (mode === "hotseat" && isXTurn && !hideX) || (me?.role === "mrx");
  const detPosSet = useMemo(() => new Set(state.detectives.map((d) => d.pos)), [state.detectives]);

  // calcul des coups légaux pour l'acteur courant
  const legal = useMemo(() => {
    if (state.phase !== "playing") return {};
    if (isXTurn && iControlX) {
      const { normal, black } = xMoves(state.mrx.pos, detPosSet, state.mrx.tickets.black > 0);
      if (useBlack) return black;
      return normal;
    }
    if (state.turn === "detectives" && selPawn) {
      const p = state.detectives.find((d) => d.id === selPawn);
      if (!p || p.moved) return {};
      const owns = mode === "hotseat" || p.owner === myId;
      if (!owns) return {};
      return detectiveMoves(p.pos, p.tickets, occupiedNodes(state.detectives, p.id));
    }
    return {};
  }, [state, isXTurn, iControlX, useBlack, selPawn, detPosSet, myId, mode]);

  // auto-sélection d'un pion détective contrôlable
  useEffect(() => {
    if (state.turn === "detectives") {
      const mine = state.detectives.filter((d) => (mode === "hotseat" || d.owner === myId) && !d.moved);
      if (mine.length && (!selPawn || !mine.find((d) => d.id === selPawn))) setSelPawn(mine[0].id);
      if (!mine.length) setSelPawn(null);
    } else setSelPawn(null);
  }, [state.turn, state.detectives, myId, mode]);

  // détection blocage de Mister X (à son tour, aucun coup)
  useEffect(() => {
    if (state.phase !== "playing" || !isXTurn || !iControlX) return;
    const { normal, black } = xMoves(state.mrx.pos, detPosSet, state.mrx.tickets.black > 0);
    if (Object.keys(normal).length === 0 && Object.keys(black).length === 0) {
      commit((s) => { s.phase = "over"; s.result = { winner: "detectives", reason: "Blocage ! Mister X est encerclé, aucun mouvement possible." }; return s; });
    }
  }, [state.phase, isXTurn, iControlX]);

  const onPanStart = (e) => {
    dragMoved.current = false;
    isPanningRef.current = true;
    setIsPanning(true);
    panStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y, origX: e.clientX, origY: e.clientY };
  };
  const onPanMove = (e) => {
    if (!isPanningRef.current) return;
    const dx = e.clientX - panStart.current.origX;
    const dy = e.clientY - panStart.current.origY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragMoved.current = true;
    setPan({ x: e.clientX - panStart.current.x, y: e.clientY - panStart.current.y });
  };
  const onPanEnd = () => { isPanningRef.current = false; setIsPanning(false); };

  const onNodeClick = (id) => {
    if (dragMoved.current) return;
    if (state.phase !== "playing") return;
    const types = legal[id];
    if (!types || !types.length) return;
    if (types.length === 1) doMove(id, types[0]);
    else setPendingTo({ to: id, types });
  };

  const doMove = (to, type) => {
    setPendingTo(null);
    if (isXTurn && iControlX) {
      commit((s) => {
        const isBlack = useBlack;
        s.mrx.pos = to;
        s.mrx.log.push({ round: s.round, type: isBlack ? "black" : type, part: s.mrx.doubleActive ? 2 : 1 });
        if (isBlack) s.mrx.tickets.black -= 1;
        if (doubleMove && !s.mrx.doubleActive) {
          // premier des deux coups
          s.mrx.doubleActive = true;
          s.message = "Double coup : Mister X joue un second déplacement.";
        } else {
          if (s.mrx.doubleActive) { s.mrx.tickets.x2 -= 1; s.mrx.doubleActive = false; }
          endXTurn(s);
        }
        return s;
      });
      setUseBlack(false);
      if (!(doubleMove && !state.mrx.doubleActive)) setDoubleMove(false);
    } else {
      commit((s) => {
        const p = s.detectives.find((d) => d.id === selPawn);
        if (!p || p.moved) return null;
        const occ = occupiedNodes(s.detectives, p.id);
        const lm = detectiveMoves(p.pos, p.tickets, occ);
        if (!lm[to] || !lm[to].includes(type)) return null;
        p.tickets[type] -= 1;
        p.pos = to;
        return afterDetectiveMove(s, p);
      });
    }
  };

  const endTurnManually = () => {
    // détective : passer la main si plus rien à faire / volontaire
    commit((s) => { s.detectives.forEach((d) => { if ((mode === "hotseat" || d.owner === myId)) d.moved = true; }); return advanceIfDone(s); });
  };

  /* ----- rendu ----- */
  const turnLabel = isXTurn ? "Tour de Mister X" : "Tour des détectives";
  const revealNow = REVEALS.includes(state.round);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* barre haute */}
      <div className="sticky top-0 z-20 bg-slate-950/90 backdrop-blur border-b border-slate-800 px-4 py-2 flex items-center gap-3 flex-wrap">
        <span className="font-black tracking-tight">SY · LYON</span>
        {mode === "online" && <span className="text-xs bg-slate-800 px-2 py-1 rounded">Code {code}</span>}
        <span className="text-xs text-slate-400">Tour {state.round}/{TOTAL_ROUNDS}</span>
        <span className={"text-xs font-bold px-2 py-1 rounded " + (isXTurn ? "bg-[#e2231a]" : "bg-[#0072bc]")}>{turnLabel}</span>
        {revealNow && isXTurn && <span className="text-xs bg-amber-500 text-black px-2 py-1 rounded font-bold">👁 Tour de révélation</span>}
        <span className="ml-auto text-xs px-2 py-1 rounded bg-slate-800">
          Vous : {me?.role === "mrx" ? "Mister X" : me?.role === "detective" ? "Détective" : "Spectateur"}{mode === "hotseat" && " (écran partagé)"}
        </span>
      </div>

      {state.phase === "over" && <GameOver state={state} myId={myId} commit={commit} />}

      <div className="flex flex-col lg:flex-row">
        {/* PLATEAU */}
        <div className="flex-1 p-3">
          <div className="flex items-center gap-2 mb-2">
            <button onClick={() => setZoom((z) => Math.max(700, z - 180))} className="w-8 h-8 rounded bg-slate-800 font-bold text-lg leading-none">−</button>
            <button onClick={() => setZoom((z) => Math.min(2800, z + 180))} className="w-8 h-8 rounded bg-slate-800 font-bold text-lg leading-none">+</button>
            <button onClick={() => setPan({ x: 0, y: 0 })} className="px-2 h-8 rounded bg-slate-800 text-xs">Recentrer</button>
            <span className="text-xs text-slate-500">Glisser pour naviguer · +/− pour zoomer</span>
          </div>
          <div
            className="rounded-xl border border-slate-700"
            style={{ height: "74vh", overflow: "hidden", cursor: isPanning ? "grabbing" : "grab", position: "relative", background: "#ddd8cc" }}
            onMouseDown={onPanStart}
            onMouseMove={onPanMove}
            onMouseUp={onPanEnd}
            onMouseLeave={onPanEnd}
          >
            <div style={{ transform: `translate(${pan.x}px, ${pan.y}px)`, display: "inline-block", userSelect: "none" }}>
              <BoardSVG width={zoom} state={state} legal={legal} onNodeClick={onNodeClick}
                showXTrue={showXTrue} selPawn={selPawn} hideX={hideX} />
            </div>
          </div>
          <Legend />
        </div>

        {/* PANNEAU */}
        <div className="lg:w-[360px] p-3 space-y-3">
          <TravelLog state={state} />

          {state.phase === "playing" && (
            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3">
              {/* contrôles Mister X */}
              {isXTurn && iControlX && (
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">Vos atouts — Mister X</p>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <button onClick={() => setUseBlack((v) => !v)} disabled={state.mrx.tickets.black <= 0}
                      className={"rounded-lg py-2 text-sm font-semibold border disabled:opacity-30 " + (useBlack ? "bg-slate-100 text-slate-900 border-slate-100" : "bg-slate-800 border-slate-700")}>
                      ⬛ Ticket noir ({state.mrx.tickets.black})
                    </button>
                    <button onClick={() => setDoubleMove((v) => !v)} disabled={state.mrx.tickets.x2 <= 0 || state.mrx.doubleActive}
                      className={"rounded-lg py-2 text-sm font-semibold border disabled:opacity-30 " + (doubleMove ? "bg-[#e2231a] border-[#e2231a]" : "bg-slate-800 border-slate-700")}>
                      ✕2 Double coup ({state.mrx.tickets.x2})
                    </button>
                  </div>
                  {state.mrx.doubleActive && <p className="text-xs text-amber-400 mb-2">Double coup en cours — jouez votre second déplacement.</p>}
                  {useBlack && <p className="text-xs text-slate-300 mb-2">Le ticket noir masque votre moyen de transport et permet d'emprunter les navettes fluviales ⛴.</p>}
                  <p className="text-xs text-slate-400">Cliquez une station surlignée pour vous y déplacer. Position visible par vous seul.</p>
                  {me?.role === "mrx" && <p className="text-sm mt-2">Position actuelle : <b className="text-[#e2231a]">{state.mrx.pos}</b></p>}
                </div>
              )}

              {/* contrôles détectives */}
              {state.turn === "detectives" && iControlDet && (
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">Vos pions</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {state.detectives.filter((d) => mode === "hotseat" || d.owner === myId).map((d) => (
                      <button key={d.id} onClick={() => setSelPawn(d.id)} disabled={d.moved}
                        className={"px-3 py-2 rounded-lg text-sm font-bold border disabled:opacity-30 " + (selPawn === d.id ? "border-white" : "border-slate-700")}
                        style={{ background: d.color + "22", color: d.color }}>
                        #{d.label} · {d.pos}{d.moved ? " ✓" : ""}
                      </button>
                    ))}
                  </div>
                  {selPawn && <TicketBar pawn={state.detectives.find((d) => d.id === selPawn)} />}
                  <p className="text-xs text-slate-400 mt-2">Cliquez une station surlignée pour déplacer le pion sélectionné. Interdit de finir sur un autre détective.</p>
                  <button onClick={endTurnManually} className="w-full mt-3 bg-slate-800 hover:bg-slate-700 rounded-lg py-2 text-sm font-semibold">Passer la main aux détectives suivants / Mister X</button>
                </div>
              )}

              {/* pas mon tour */}
              {((isXTurn && !iControlX) || (state.turn === "detectives" && !iControlDet)) && (
                <p className="text-sm text-slate-400">{state.message} En attente des autres joueurs…</p>
              )}
            </div>
          )}

          {/* interstitiel hotseat pour masquer Mister X */}
          {mode === "hotseat" && state.phase === "playing" && !isXTurn && (
            <button onClick={() => setHideX(true)} className="hidden" />
          )}
          {mode === "hotseat" && state.phase === "playing" && isXTurn && (
            <button onClick={() => setHideX((v) => !v)} className="w-full bg-slate-800 rounded-lg py-2 text-xs">
              {hideX ? "Afficher la position de Mister X (c'est son tour)" : "Masquer la position (avant de passer l'appareil)"}
            </button>
          )}

          <PlayersPanel state={state} myId={myId} />
        </div>
      </div>

      {/* choix du transport si ambigu */}
      {pendingTo && (
        <div className="fixed inset-0 z-30 bg-black/60 grid place-items-center p-6" onClick={() => setPendingTo(null)}>
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 w-full max-w-xs" onClick={(e) => e.stopPropagation()}>
            <p className="text-sm font-semibold mb-3">Vers la station {pendingTo.to} — quel transport ?</p>
            <div className="space-y-2">
              {pendingTo.types.map((t) => (
                <button key={t} onClick={() => doMove(pendingTo.to, t)} className="w-full flex items-center gap-2 bg-slate-800 hover:bg-slate-700 rounded-lg py-2 px-3 text-left">
                  <span>{TYPE_ICON[t]}</span><span>{TYPE_LABEL[t]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===================== PLATEAU SVG ===================== */
function BoardSVG({ width, state, legal, onNodeClick, showXTrue, selPawn, hideX }) {
  const W = BOARD.width, H = BOARD.height;
  const detByPos = {};
  state.detectives?.forEach((d) => (detByPos[d.pos] = d));
  const xRevealed = state.mrx?.revealedPos;
  const xTrue = state.mrx?.pos;

  const edgeColor = (e) => e.type === "metro" ? (LINE_COLORS[e.line] || TYPE_COLORS.metro) : TYPE_COLORS[e.type];
  const edgeW = { taxi: 1.6, bus: 3.5, tram: 4, boat: 3, metro: 6 };

  /* Presqu'île = polygone entre Saône et Rhône */
  const saone = BOARD.rivers[0].pts;
  const rhone = BOARD.rivers[1].pts;
  const peninsula = [...saone, ...[...rhone].reverse()].map(p => p.join(",")).join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={width} height={width * H / W} style={{ display: "block" }}>
      <defs>
        {/* Grille de rues */}
        <pattern id="streetGrid" x="0" y="0" width="44" height="44" patternUnits="userSpaceOnUse">
          <line x1="44" y1="0" x2="0" y2="0" stroke="#c0bbb0" strokeWidth="0.35" />
          <line x1="0" y1="0" x2="0" y2="44" stroke="#c0bbb0" strokeWidth="0.35" />
        </pattern>
        {/* Gradient eau */}
        <linearGradient id="waterGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5ba3d4" />
          <stop offset="50%" stopColor="#7bbee8" />
          <stop offset="100%" stopColor="#5ba3d4" />
        </linearGradient>
      </defs>

      {/* ── Fond carte ── */}
      <rect x="0" y="0" width={W} height={H} fill="#e8e3d8" />
      <rect x="0" y="0" width={W} height={H} fill="url(#streetGrid)" />

      {/* Blocs urbains (zones bâties hachurées) */}
      {[
        [0,0,290,270],[300,0,220,260],[530,0,230,260],[770,0,200,260],
        [0,280,280,260],[560,280,200,260],[770,280,200,260],
        [0,560,280,260],[560,560,200,260],[770,560,200,260],
        [0,840,280,135],[560,840,200,135],[770,840,200,135],
      ].map(([x,y,w,h],i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="2"
          fill="#ddd8cc" stroke="#cac5ba" strokeWidth="0.6" opacity="0.65" />
      ))}

      {/* Presqu'île (entre les deux fleuves) */}
      <polygon points={peninsula} fill="#e2ddd2" opacity="0.85" />

      {/* Espaces verts (parcs approximatifs) */}
      <ellipse cx="155" cy="175" rx="50" ry="38" fill="#a8cc88" opacity="0.55" />
      <ellipse cx="735" cy="155" rx="62" ry="42" fill="#a8cc88" opacity="0.55" />
      <ellipse cx="870" cy="460" rx="38" ry="52" fill="#a8cc88" opacity="0.5" />
      <ellipse cx="415" cy="760" rx="32" ry="26" fill="#a8cc88" opacity="0.5" />
      <ellipse cx="80" cy="670" rx="28" ry="35" fill="#a8cc88" opacity="0.45" />
      <text x="155" y="178" textAnchor="middle" fontSize="9" fill="#3a6e20" opacity="0.75" fontStyle="italic">Parc</text>
      <text x="735" y="158" textAnchor="middle" fontSize="9" fill="#3a6e20" opacity="0.75" fontStyle="italic">Tête d'Or</text>

      {/* ── Fleuves (3 couches : halo + corps + reflet) ── */}
      {BOARD.rivers.map((r, i) => (
        <polyline key={"rh"+i} points={r.pts.map(p => p.join(",")).join(" ")}
          fill="none" stroke="#6aaee0" strokeWidth="40" strokeLinecap="round" opacity="0.25" />
      ))}
      {BOARD.rivers.map((r, i) => (
        <polyline key={"rb"+i} points={r.pts.map(p => p.join(",")).join(" ")}
          fill="none" stroke="#4a92c8" strokeWidth="26" strokeLinecap="round" opacity="0.7" />
      ))}
      {BOARD.rivers.map((r, i) => (
        <polyline key={"rl"+i} points={r.pts.map(p => p.join(",")).join(" ")}
          fill="none" stroke="#88c4e8" strokeWidth="9" strokeLinecap="round" opacity="0.5" />
      ))}

      {/* Noms des fleuves */}
      <text x="288" y="490" fontSize="12" fill="#1e5080" opacity="0.8" fontStyle="italic" fontWeight="600"
        transform="rotate(-89 288 490)" textAnchor="middle">Saône</text>
      <text x="494" y="490" fontSize="12" fill="#1e5080" opacity="0.8" fontStyle="italic" fontWeight="600"
        transform="rotate(-89 494 490)" textAnchor="middle">Rhône</text>

      {/* ── Arêtes transport ── */}
      {/* Taxi en dessous */}
      {BOARD.edges.filter(e => e.type === "taxi").map((e, i) => {
        const a = NODE[e.a], b = NODE[e.b];
        return <line key={"tx"+i} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
          stroke="#a89050" strokeWidth="1.6" opacity="0.45" strokeLinecap="round" />;
      })}
      {/* Bus, tram, bateau, métro */}
      {["bus","tram","boat","metro"].map(tp =>
        BOARD.edges.filter(e => e.type === tp).map((e, i) => {
          const a = NODE[e.a], b = NODE[e.b];
          const col = edgeColor(e);
          return (
            <g key={tp+i}>
              {/* Ombre de ligne */}
              <line x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke="#00000030" strokeWidth={edgeW[tp]+2} strokeLinecap="round" />
              <line x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke={col} strokeWidth={edgeW[tp]} opacity={0.92}
                strokeDasharray={tp === "boat" ? "8 6" : undefined} strokeLinecap="round" />
            </g>
          );
        })
      )}

      {/* ── Nœuds ── */}
      {BOARD.nodes.map((n) => {
        const isLegal = !!legal[n.id];
        return (
          <g key={n.id} onClick={() => onNodeClick(n.id)} style={{ cursor: isLegal ? "pointer" : "default" }}>
            {isLegal && (
              <>
                <circle cx={n.x} cy={n.y} r="20" fill="#fde04720" stroke="none" />
                <circle cx={n.x} cy={n.y} r="17" fill="none" stroke="#fde047" strokeWidth="2.5" opacity="0.95" />
              </>
            )}
            {/* Corps du nœud */}
            <circle cx={n.x} cy={n.y} r={n.metro ? 12 : 9}
              fill={n.metro ? "#1a2540" : "#2d3a50"}
              stroke={n.metro ? "#e8ecf4" : "#8899b0"}
              strokeWidth={n.metro ? 2.5 : 1.5} />
            <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize={n.metro ? 9.5 : 8}
              fill="#dce8f8" fontWeight="700">{n.id}</text>
            {/* Nom station métro avec fond */}
            {n.name && (
              <g>
                <rect x={n.x - 42} y={n.y - 28} width="84" height="14" rx="3" fill="#1a254088" />
                <text x={n.x} y={n.y - 18} textAnchor="middle" fontSize="10" fill="#93c5fd" fontWeight="700">{n.name}</text>
              </g>
            )}
          </g>
        );
      })}

      {/* Dernière position connue de X */}
      {xRevealed && (!showXTrue || xRevealed !== xTrue) && (
        <g>
          <circle cx={NODE[xRevealed].x} cy={NODE[xRevealed].y} r="18"
            fill="#f59e0b18" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4 3" />
          <rect x={NODE[xRevealed].x - 28} y={NODE[xRevealed].y - 28} width="56" height="12" rx="2" fill="#92400e" />
          <text x={NODE[xRevealed].x} y={NODE[xRevealed].y - 19} textAnchor="middle" fontSize="9" fill="#fde68a" fontWeight="700">
            vu T{state.mrx.revealedRound}
          </text>
        </g>
      )}

      {/* Pions détectives */}
      {state.detectives?.map((d) => {
        const n = NODE[d.pos];
        const isSelected = selPawn === d.id;
        return (
          <g key={d.id}>
            {isSelected && <circle cx={n.x} cy={n.y} r="17" fill="none" stroke="#ffffff60" strokeWidth="2" strokeDasharray="3 2" />}
            <circle cx={n.x} cy={n.y} r="13" fill={d.color} stroke="#fff" strokeWidth="2.5" opacity={isSelected ? 1 : 0.88} />
            <text x={n.x} y={n.y + 4.5} textAnchor="middle" fontSize="12" fill="#0f172a" fontWeight="900">{d.label}</text>
          </g>
        );
      })}

      {/* Mister X */}
      {showXTrue && xTrue && !hideX && (() => {
        const n = NODE[xTrue];
        return (
          <g>
            <circle cx={n.x} cy={n.y} r="18" fill="#e2231a30" stroke="none" />
            <circle cx={n.x} cy={n.y} r="14" fill="#1a0a0a" stroke="#e2231a" strokeWidth="3.5" />
            <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize="14" fill="#e2231a" fontWeight="900">X</text>
          </g>
        );
      })()}
    </svg>
  );
}

function Legend() {
  const items = [["Métro A", LINE_COLORS.A], ["B", LINE_COLORS.B], ["C", LINE_COLORS.C], ["D", LINE_COLORS.D], ["Tram", TYPE_COLORS.tram], ["Bus", TYPE_COLORS.bus], ["Taxi/rue", TYPE_COLORS.taxi], ["Navette ⛴", TYPE_COLORS.boat]];
  return (
    <div className="flex flex-wrap gap-3 mt-2 text-xs text-slate-400">
      {items.map(([l, c]) => (<span key={l} className="flex items-center gap-1"><span className="inline-block w-4 h-1 rounded" style={{ background: c }} />{l}</span>))}
    </div>
  );
}

/* ===================== CARNET DE ROUTE (déduction) ===================== */
function TravelLog({ state }) {
  const log = state.mrx?.log || [];
  return (
    <div className="rounded-xl p-3 border border-amber-900/40" style={{ background: "linear-gradient(180deg,#1c1710,#14110b)" }}>
      <p className="text-xs uppercase tracking-[0.3em] text-amber-500/80 mb-2">Carnet de route de Mister X</p>
      {log.length === 0 ? <p className="text-xs text-slate-500">Aucun déplacement encore. Surveillez ses moyens de transport pour deviner sa trajectoire.</p> : (
        <div className="flex flex-wrap gap-1.5">
          {log.map((m, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-9 h-9 rounded-md grid place-items-center text-lg border"
                style={{ background: m.type === "black" ? "#0b0b0b" : "#241d12", borderColor: m.type === "black" ? "#444" : "#5a4a2a" }}
                title={`Tour ${m.round} · ${TYPE_LABEL[m.type]}`}>
                {TYPE_ICON[m.type]}
              </div>
              <span className="text-[9px] text-amber-700 mt-0.5">T{m.round}{m.part === 2 ? "b" : ""}</span>
            </div>
          ))}
        </div>
      )}
      <p className="text-[10px] text-slate-500 mt-2">Révélations aux tours {REVEALS.join(", ")}.</p>
    </div>
  );
}

function TicketBar({ pawn }) {
  if (!pawn) return null;
  return (
    <div className="grid grid-cols-4 gap-2">
      {["taxi", "bus", "tram", "metro"].map((t) => (
        <div key={t} className="rounded-lg bg-slate-800 py-2 text-center">
          <div className="text-lg leading-none">{TYPE_ICON[t]}</div>
          <div className="text-sm font-bold" style={{ color: pawn.tickets[t] > 0 ? "#fff" : "#64748b" }}>{pawn.tickets[t]}</div>
          <div className="text-[9px] text-slate-500">{TYPE_LABEL[t]}</div>
        </div>
      ))}
    </div>
  );
}

function PlayersPanel({ state, myId }) {
  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3">
      <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">Joueurs</p>
      <ul className="space-y-1 text-sm">
        {state.players.map((p) => {
          const pawns = state.detectives?.filter((d) => d.owner === p.id) || [];
          return (
            <li key={p.id} className="flex items-center justify-between">
              <span>{p.name}{p.id === myId && " (vous)"}</span>
              <span className="text-xs text-slate-400">
                {p.role === "mrx" ? "🕵️‍♂️ Mister X" : pawns.length ? "👮 " + pawns.map((d) => "#" + d.label).join(" ") : "👮"}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ===================== FIN DE PARTIE ===================== */
function GameOver({ state, myId, commit }) {
  const win = state.result?.winner;
  const replay = () => commit((s) => {
    s.phase = "lobby"; s.round = 0; s.turn = "mrx";
    s.detectives = []; s.mrx = null; s.result = null;
    s.players.forEach((p) => (p.role = null));
    return s;
  });
  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800 px-6 py-6 text-center">
      <p className="text-xs tracking-[0.4em] uppercase text-slate-400">Fin de l'enquête</p>
      <h2 className="text-3xl font-black mt-1" style={{ color: win === "mrx" ? "#e2231a" : "#38bdf8" }}>
        {win === "mrx" ? "Mister X s'est échappé" : "Mister X est arrêté"}
      </h2>
      <p className="text-slate-300 mt-2">{state.result?.reason}</p>
      <p className="text-slate-400 text-sm mt-1">Mister X était parti de la station {state.mrx?.start} et terminait en {state.mrx?.pos}.</p>
      <button onClick={replay} className="mt-4 bg-[#e2231a] hover:brightness-110 text-white font-bold px-6 py-2 rounded-lg">Rejouer (retour au lobby)</button>
    </div>
  );
}

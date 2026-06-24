import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";

/* ===================== DONNÉES DU PLATEAU ===================== */
const BOARD = {"width":1240,"height":1180,"nodes":[{"id":1,"x":215,"y":110,"name":"Gare de Vaise","metro":true},{"id":2,"x":245,"y":200,"name":"Valmy","metro":false},{"id":3,"x":225,"y":330,"name":"Gorge de Loup","metro":true},{"id":4,"x":300,"y":470,"name":"Vieux Lyon","metro":true},{"id":5,"x":560,"y":45,"name":"Cuire","metro":true},{"id":6,"x":528,"y":110,"name":"Hénon","metro":true},{"id":7,"x":498,"y":185,"name":"Croix-Rousse","metro":false},{"id":8,"x":512,"y":265,"name":"Croix-Paquet","metro":false},{"id":9,"x":525,"y":330,"name":"Hôtel de Ville","metro":true},{"id":10,"x":540,"y":420,"name":"Cordeliers","metro":false},{"id":11,"x":530,"y":560,"name":"Bellecour","metro":true},{"id":12,"x":525,"y":650,"name":"Ampère-Victor Hugo","metro":false},{"id":13,"x":515,"y":740,"name":"Perrache","metro":true},{"id":14,"x":640,"y":320,"name":"Foch","metro":false},{"id":15,"x":735,"y":328,"name":"Masséna","metro":true},{"id":16,"x":815,"y":338,"name":"Charpennes","metro":true},{"id":17,"x":895,"y":330,"name":"République","metro":false},{"id":18,"x":965,"y":318,"name":"Gratte-Ciel","metro":true},{"id":19,"x":1035,"y":300,"name":"Flachet","metro":false},{"id":20,"x":1100,"y":285,"name":"Cusset","metro":false},{"id":21,"x":1155,"y":255,"name":"L. Bonnevay","metro":true},{"id":22,"x":1185,"y":215,"name":"Vaulx La Soie","metro":true},{"id":23,"x":800,"y":420,"name":"Brotteaux","metro":false},{"id":24,"x":760,"y":510,"name":"Part-Dieu","metro":true},{"id":25,"x":730,"y":580,"name":"Place Guichard","metro":false},{"id":26,"x":710,"y":650,"name":"Saxe-Gambetta","metro":true},{"id":27,"x":690,"y":730,"name":"Jean Jaurès","metro":false},{"id":28,"x":660,"y":805,"name":"Debourg","metro":true},{"id":29,"x":625,"y":875,"name":"Stade de Gerland","metro":false},{"id":30,"x":520,"y":905,"name":"Gare d'Oullins","metro":true},{"id":31,"x":650,"y":560,"name":"Guillotière","metro":false},{"id":32,"x":760,"y":660,"name":"Garibaldi","metro":false},{"id":33,"x":830,"y":670,"name":"Sans Souci","metro":false},{"id":34,"x":900,"y":680,"name":"Monplaisir-Lumière","metro":true},{"id":35,"x":975,"y":650,"name":"Grange Blanche","metro":false},{"id":36,"x":1035,"y":705,"name":"Laënnec","metro":false},{"id":37,"x":1065,"y":780,"name":"Mermoz-Pinel","metro":true},{"id":38,"x":1070,"y":860,"name":"Parilly","metro":false},{"id":39,"x":960,"y":935,"name":"Gare de Vénissieux","metro":true},{"id":40,"x":495,"y":855,"name":"Confluence","metro":false},{"id":41,"x":660,"y":715,"name":"Jean Macé","metro":false},{"id":42,"x":870,"y":250,"name":"Parc Tête d'Or","metro":false},{"id":43,"x":1130,"y":560,"name":"Bron","metro":false},{"id":44,"x":900,"y":165,"name":"IUT Feyssine","metro":false},{"id":45,"x":69,"y":93,"metro":false},{"id":46,"x":69,"y":174,"metro":false},{"id":47,"x":61,"y":243,"metro":false},{"id":48,"x":84,"y":368,"metro":false},{"id":49,"x":72,"y":460,"metro":false},{"id":50,"x":81,"y":544,"metro":false},{"id":51,"x":77,"y":641,"metro":false},{"id":52,"x":83,"y":798,"metro":false},{"id":53,"x":66,"y":883,"metro":false},{"id":54,"x":68,"y":999,"metro":false},{"id":55,"x":93,"y":1072,"metro":false},{"id":56,"x":146,"y":60,"metro":false},{"id":57,"x":149,"y":185,"metro":false},{"id":58,"x":156,"y":276,"metro":false},{"id":59,"x":150,"y":364,"metro":false},{"id":60,"x":181,"y":422,"metro":false},{"id":61,"x":181,"y":534,"metro":false},{"id":62,"x":185,"y":644,"metro":false},{"id":63,"x":169,"y":723,"metro":false},{"id":64,"x":145,"y":784,"metro":false},{"id":65,"x":167,"y":910,"metro":false},{"id":66,"x":165,"y":1009,"metro":false},{"id":67,"x":262,"y":60,"metro":false},{"id":68,"x":259,"y":515,"metro":false},{"id":69,"x":271,"y":710,"metro":false},{"id":70,"x":247,"y":804,"metro":false},{"id":71,"x":268,"y":895,"metro":false},{"id":72,"x":238,"y":976,"metro":false},{"id":73,"x":275,"y":1086,"metro":false},{"id":74,"x":326,"y":800,"metro":false},{"id":75,"x":353,"y":876,"metro":false},{"id":76,"x":324,"y":975,"metro":false},{"id":77,"x":338,"y":1065,"metro":false},{"id":78,"x":459,"y":70,"metro":false},{"id":79,"x":416,"y":161,"metro":false},{"id":80,"x":423,"y":345,"metro":false},{"id":81,"x":431,"y":426,"metro":false},{"id":82,"x":438,"y":523,"metro":false},{"id":83,"x":455,"y":622,"metro":false},{"id":84,"x":417,"y":810,"metro":false},{"id":85,"x":456,"y":904,"metro":false},{"id":86,"x":447,"y":997,"metro":false},{"id":87,"x":435,"y":1101,"metro":false},{"id":88,"x":532,"y":1010,"metro":false},{"id":89,"x":553,"y":1081,"metro":false},{"id":90,"x":621,"y":56,"metro":false},{"id":91,"x":640,"y":163,"metro":false},{"id":92,"x":607,"y":250,"metro":false},{"id":93,"x":601,"y":427,"metro":false},{"id":94,"x":604,"y":516,"metro":false},{"id":95,"x":605,"y":644,"metro":false},{"id":96,"x":643,"y":1010,"metro":false},{"id":97,"x":631,"y":1089,"metro":false},{"id":98,"x":723,"y":72,"metro":false},{"id":99,"x":710,"y":157,"metro":false},{"id":100,"x":722,"y":794,"metro":false},{"id":101,"x":714,"y":903,"metro":false},{"id":102,"x":728,"y":1011,"metro":false},{"id":103,"x":719,"y":1077,"metro":false},{"id":104,"x":786,"y":64,"metro":false},{"id":105,"x":820,"y":809,"metro":false},{"id":106,"x":818,"y":892,"metro":false},{"id":107,"x":827,"y":988,"metro":false},{"id":108,"x":806,"y":1095,"metro":false},{"id":109,"x":903,"y":51,"metro":false},{"id":110,"x":916,"y":431,"metro":false},{"id":111,"x":886,"y":531,"metro":false},{"id":112,"x":905,"y":795,"metro":false},{"id":113,"x":905,"y":896,"metro":false},{"id":114,"x":885,"y":1083,"metro":false},{"id":115,"x":1005,"y":81,"metro":false},{"id":116,"x":991,"y":165,"metro":false},{"id":117,"x":967,"y":238,"metro":false},{"id":118,"x":996,"y":426,"metro":false},{"id":119,"x":977,"y":520,"metro":false},{"id":120,"x":976,"y":811,"metro":false},{"id":121,"x":981,"y":1008,"metro":false},{"id":122,"x":998,"y":1077,"metro":false},{"id":123,"x":1075,"y":49,"metro":false},{"id":124,"x":1095,"y":151,"metro":false},{"id":125,"x":1066,"y":426,"metro":false},{"id":126,"x":1090,"y":508,"metro":false},{"id":127,"x":1072,"y":626,"metro":false},{"id":128,"x":1096,"y":1003,"metro":false},{"id":129,"x":1102,"y":1066,"metro":false},{"id":130,"x":1192,"y":84,"metro":false},{"id":131,"x":1155,"y":141,"metro":false},{"id":132,"x":1164,"y":349,"metro":false},{"id":133,"x":1183,"y":461,"metro":false},{"id":134,"x":1196,"y":622,"metro":false},{"id":135,"x":1186,"y":724,"metro":false},{"id":136,"x":1151,"y":787,"metro":false},{"id":137,"x":1167,"y":895,"metro":false},{"id":138,"x":1159,"y":1000,"metro":false},{"id":139,"x":1172,"y":1098,"metro":false}],"edges":[{"a":1,"b":67,"type":"taxi","line":null},{"a":1,"b":56,"type":"taxi","line":null},{"a":1,"b":2,"type":"taxi","line":null},{"a":1,"b":57,"type":"taxi","line":null},{"a":2,"b":57,"type":"taxi","line":null},{"a":2,"b":58,"type":"taxi","line":null},{"a":2,"b":3,"type":"taxi","line":null},{"a":3,"b":59,"type":"taxi","line":null},{"a":3,"b":58,"type":"taxi","line":null},{"a":3,"b":60,"type":"taxi","line":null},{"a":4,"b":60,"type":"taxi","line":null},{"a":4,"b":61,"type":"taxi","line":null},{"a":5,"b":90,"type":"taxi","line":null},{"a":5,"b":78,"type":"taxi","line":null},{"a":5,"b":91,"type":"taxi","line":null},{"a":6,"b":78,"type":"taxi","line":null},{"a":6,"b":7,"type":"taxi","line":null},{"a":6,"b":90,"type":"taxi","line":null},{"a":7,"b":8,"type":"taxi","line":null},{"a":7,"b":79,"type":"taxi","line":null},{"a":7,"b":78,"type":"taxi","line":null},{"a":8,"b":9,"type":"taxi","line":null},{"a":8,"b":92,"type":"taxi","line":null},{"a":8,"b":80,"type":"taxi","line":null},{"a":9,"b":80,"type":"taxi","line":null},{"a":9,"b":92,"type":"taxi","line":null},{"a":10,"b":93,"type":"taxi","line":null},{"a":10,"b":81,"type":"taxi","line":null},{"a":10,"b":94,"type":"taxi","line":null},{"a":11,"b":94,"type":"taxi","line":null},{"a":11,"b":12,"type":"taxi","line":null},{"a":11,"b":83,"type":"taxi","line":null},{"a":11,"b":82,"type":"taxi","line":null},{"a":12,"b":83,"type":"taxi","line":null},{"a":12,"b":95,"type":"taxi","line":null},{"a":13,"b":95,"type":"taxi","line":null},{"a":14,"b":92,"type":"taxi","line":null},{"a":14,"b":93,"type":"taxi","line":null},{"a":15,"b":23,"type":"taxi","line":null},{"a":15,"b":92,"type":"taxi","line":null},{"a":16,"b":17,"type":"taxi","line":null},{"a":16,"b":23,"type":"taxi","line":null},{"a":17,"b":18,"type":"taxi","line":null},{"a":17,"b":42,"type":"taxi","line":null},{"a":17,"b":110,"type":"taxi","line":null},{"a":18,"b":19,"type":"taxi","line":null},{"a":18,"b":117,"type":"taxi","line":null},{"a":18,"b":118,"type":"taxi","line":null},{"a":19,"b":20,"type":"taxi","line":null},{"a":19,"b":117,"type":"taxi","line":null},{"a":19,"b":21,"type":"taxi","line":null},{"a":20,"b":21,"type":"taxi","line":null},{"a":20,"b":132,"type":"taxi","line":null},{"a":20,"b":22,"type":"taxi","line":null},{"a":21,"b":132,"type":"taxi","line":null},{"a":21,"b":131,"type":"taxi","line":null},{"a":22,"b":131,"type":"taxi","line":null},{"a":22,"b":124,"type":"taxi","line":null},{"a":23,"b":110,"type":"taxi","line":null},{"a":24,"b":111,"type":"taxi","line":null},{"a":25,"b":26,"type":"taxi","line":null},{"a":25,"b":31,"type":"taxi","line":null},{"a":25,"b":32,"type":"taxi","line":null},{"a":26,"b":32,"type":"taxi","line":null},{"a":26,"b":27,"type":"taxi","line":null},{"a":27,"b":41,"type":"taxi","line":null},{"a":27,"b":100,"type":"taxi","line":null},{"a":28,"b":100,"type":"taxi","line":null},{"a":29,"b":101,"type":"taxi","line":null},{"a":29,"b":30,"type":"taxi","line":null},{"a":29,"b":100,"type":"taxi","line":null},{"a":30,"b":40,"type":"taxi","line":null},{"a":30,"b":88,"type":"taxi","line":null},{"a":31,"b":94,"type":"taxi","line":null},{"a":31,"b":95,"type":"taxi","line":null},{"a":32,"b":33,"type":"taxi","line":null},{"a":32,"b":27,"type":"taxi","line":null},{"a":33,"b":34,"type":"taxi","line":null},{"a":33,"b":26,"type":"taxi","line":null},{"a":33,"b":25,"type":"taxi","line":null},{"a":34,"b":35,"type":"taxi","line":null},{"a":34,"b":112,"type":"taxi","line":null},{"a":34,"b":36,"type":"taxi","line":null},{"a":35,"b":127,"type":"taxi","line":null},{"a":35,"b":119,"type":"taxi","line":null},{"a":36,"b":127,"type":"taxi","line":null},{"a":36,"b":120,"type":"taxi","line":null},{"a":37,"b":38,"type":"taxi","line":null},{"a":37,"b":136,"type":"taxi","line":null},{"a":37,"b":120,"type":"taxi","line":null},{"a":38,"b":137,"type":"taxi","line":null},{"a":38,"b":120,"type":"taxi","line":null},{"a":38,"b":136,"type":"taxi","line":null},{"a":39,"b":113,"type":"taxi","line":null},{"a":39,"b":121,"type":"taxi","line":null},{"a":39,"b":120,"type":"taxi","line":null},{"a":39,"b":38,"type":"taxi","line":null},{"a":41,"b":95,"type":"taxi","line":null},{"a":42,"b":44,"type":"taxi","line":null},{"a":42,"b":117,"type":"taxi","line":null},{"a":43,"b":126,"type":"taxi","line":null},{"a":43,"b":127,"type":"taxi","line":null},{"a":43,"b":134,"type":"taxi","line":null},{"a":43,"b":133,"type":"taxi","line":null},{"a":44,"b":116,"type":"taxi","line":null},{"a":44,"b":117,"type":"taxi","line":null},{"a":44,"b":109,"type":"taxi","line":null},{"a":45,"b":46,"type":"taxi","line":null},{"a":45,"b":56,"type":"taxi","line":null},{"a":45,"b":57,"type":"taxi","line":null},{"a":45,"b":1,"type":"taxi","line":null},{"a":46,"b":47,"type":"taxi","line":null},{"a":46,"b":57,"type":"taxi","line":null},{"a":46,"b":58,"type":"taxi","line":null},{"a":47,"b":58,"type":"taxi","line":null},{"a":47,"b":57,"type":"taxi","line":null},{"a":47,"b":48,"type":"taxi","line":null},{"a":48,"b":59,"type":"taxi","line":null},{"a":48,"b":49,"type":"taxi","line":null},{"a":48,"b":60,"type":"taxi","line":null},{"a":48,"b":58,"type":"taxi","line":null},{"a":49,"b":50,"type":"taxi","line":null},{"a":49,"b":60,"type":"taxi","line":null},{"a":49,"b":59,"type":"taxi","line":null},{"a":50,"b":51,"type":"taxi","line":null},{"a":50,"b":61,"type":"taxi","line":null},{"a":50,"b":62,"type":"taxi","line":null},{"a":51,"b":62,"type":"taxi","line":null},{"a":51,"b":63,"type":"taxi","line":null},{"a":51,"b":61,"type":"taxi","line":null},{"a":52,"b":64,"type":"taxi","line":null},{"a":52,"b":53,"type":"taxi","line":null},{"a":52,"b":63,"type":"taxi","line":null},{"a":52,"b":65,"type":"taxi","line":null},{"a":53,"b":65,"type":"taxi","line":null},{"a":53,"b":54,"type":"taxi","line":null},{"a":53,"b":64,"type":"taxi","line":null},{"a":54,"b":55,"type":"taxi","line":null},{"a":54,"b":66,"type":"taxi","line":null},{"a":54,"b":65,"type":"taxi","line":null},{"a":55,"b":66,"type":"taxi","line":null},{"a":55,"b":72,"type":"taxi","line":null},{"a":55,"b":65,"type":"taxi","line":null},{"a":56,"b":67,"type":"taxi","line":null},{"a":56,"b":57,"type":"taxi","line":null},{"a":57,"b":58,"type":"taxi","line":null},{"a":58,"b":59,"type":"taxi","line":null},{"a":59,"b":60,"type":"taxi","line":null},{"a":60,"b":61,"type":"taxi","line":null},{"a":61,"b":68,"type":"taxi","line":null},{"a":61,"b":62,"type":"taxi","line":null},{"a":62,"b":63,"type":"taxi","line":null},{"a":62,"b":69,"type":"taxi","line":null},{"a":63,"b":64,"type":"taxi","line":null},{"a":63,"b":69,"type":"taxi","line":null},{"a":63,"b":70,"type":"taxi","line":null},{"a":64,"b":70,"type":"taxi","line":null},{"a":65,"b":72,"type":"taxi","line":null},{"a":65,"b":66,"type":"taxi","line":null},{"a":65,"b":71,"type":"taxi","line":null},{"a":66,"b":72,"type":"taxi","line":null},{"a":67,"b":2,"type":"taxi","line":null},{"a":67,"b":57,"type":"taxi","line":null},{"a":68,"b":60,"type":"taxi","line":null},{"a":68,"b":62,"type":"taxi","line":null},{"a":69,"b":70,"type":"taxi","line":null},{"a":69,"b":74,"type":"taxi","line":null},{"a":70,"b":74,"type":"taxi","line":null},{"a":70,"b":71,"type":"taxi","line":null},{"a":71,"b":72,"type":"taxi","line":null},{"a":71,"b":75,"type":"taxi","line":null},{"a":71,"b":76,"type":"taxi","line":null},{"a":72,"b":76,"type":"taxi","line":null},{"a":73,"b":77,"type":"taxi","line":null},{"a":73,"b":72,"type":"taxi","line":null},{"a":73,"b":76,"type":"taxi","line":null},{"a":73,"b":66,"type":"taxi","line":null},{"a":74,"b":75,"type":"taxi","line":null},{"a":74,"b":84,"type":"taxi","line":null},{"a":75,"b":84,"type":"taxi","line":null},{"a":75,"b":76,"type":"taxi","line":null},{"a":76,"b":77,"type":"taxi","line":null},{"a":77,"b":87,"type":"taxi","line":null},{"a":77,"b":86,"type":"taxi","line":null},{"a":78,"b":79,"type":"taxi","line":null},{"a":79,"b":6,"type":"taxi","line":null},{"a":79,"b":8,"type":"taxi","line":null},{"a":80,"b":10,"type":"taxi","line":null},{"a":81,"b":82,"type":"taxi","line":null},{"a":81,"b":9,"type":"taxi","line":null},{"a":82,"b":83,"type":"taxi","line":null},{"a":82,"b":10,"type":"taxi","line":null},{"a":84,"b":85,"type":"taxi","line":null},{"a":85,"b":86,"type":"taxi","line":null},{"a":86,"b":87,"type":"taxi","line":null},{"a":87,"b":89,"type":"taxi","line":null},{"a":87,"b":88,"type":"taxi","line":null},{"a":88,"b":89,"type":"taxi","line":null},{"a":88,"b":96,"type":"taxi","line":null},{"a":89,"b":97,"type":"taxi","line":null},{"a":89,"b":96,"type":"taxi","line":null},{"a":90,"b":98,"type":"taxi","line":null},{"a":90,"b":91,"type":"taxi","line":null},{"a":91,"b":99,"type":"taxi","line":null},{"a":91,"b":92,"type":"taxi","line":null},{"a":91,"b":98,"type":"taxi","line":null},{"a":93,"b":94,"type":"taxi","line":null},{"a":93,"b":9,"type":"taxi","line":null},{"a":95,"b":26,"type":"taxi","line":null},{"a":96,"b":97,"type":"taxi","line":null},{"a":96,"b":102,"type":"taxi","line":null},{"a":96,"b":103,"type":"taxi","line":null},{"a":97,"b":103,"type":"taxi","line":null},{"a":97,"b":102,"type":"taxi","line":null},{"a":98,"b":104,"type":"taxi","line":null},{"a":98,"b":99,"type":"taxi","line":null},{"a":99,"b":104,"type":"taxi","line":null},{"a":99,"b":90,"type":"taxi","line":null},{"a":100,"b":105,"type":"taxi","line":null},{"a":100,"b":41,"type":"taxi","line":null},{"a":101,"b":106,"type":"taxi","line":null},{"a":101,"b":102,"type":"taxi","line":null},{"a":101,"b":100,"type":"taxi","line":null},{"a":102,"b":103,"type":"taxi","line":null},{"a":102,"b":107,"type":"taxi","line":null},{"a":103,"b":108,"type":"taxi","line":null},{"a":104,"b":109,"type":"taxi","line":null},{"a":104,"b":44,"type":"taxi","line":null},{"a":105,"b":106,"type":"taxi","line":null},{"a":105,"b":112,"type":"taxi","line":null},{"a":105,"b":113,"type":"taxi","line":null},{"a":106,"b":113,"type":"taxi","line":null},{"a":106,"b":107,"type":"taxi","line":null},{"a":107,"b":108,"type":"taxi","line":null},{"a":107,"b":114,"type":"taxi","line":null},{"a":108,"b":114,"type":"taxi","line":null},{"a":108,"b":102,"type":"taxi","line":null},{"a":109,"b":115,"type":"taxi","line":null},{"a":109,"b":116,"type":"taxi","line":null},{"a":110,"b":118,"type":"taxi","line":null},{"a":110,"b":111,"type":"taxi","line":null},{"a":110,"b":119,"type":"taxi","line":null},{"a":111,"b":119,"type":"taxi","line":null},{"a":111,"b":23,"type":"taxi","line":null},{"a":112,"b":120,"type":"taxi","line":null},{"a":112,"b":113,"type":"taxi","line":null},{"a":113,"b":120,"type":"taxi","line":null},{"a":114,"b":122,"type":"taxi","line":null},{"a":114,"b":121,"type":"taxi","line":null},{"a":115,"b":123,"type":"taxi","line":null},{"a":115,"b":116,"type":"taxi","line":null},{"a":115,"b":124,"type":"taxi","line":null},{"a":116,"b":117,"type":"taxi","line":null},{"a":116,"b":124,"type":"taxi","line":null},{"a":118,"b":125,"type":"taxi","line":null},{"a":118,"b":119,"type":"taxi","line":null},{"a":119,"b":126,"type":"taxi","line":null},{"a":121,"b":122,"type":"taxi","line":null},{"a":121,"b":128,"type":"taxi","line":null},{"a":122,"b":129,"type":"taxi","line":null},{"a":122,"b":128,"type":"taxi","line":null},{"a":123,"b":124,"type":"taxi","line":null},{"a":123,"b":131,"type":"taxi","line":null},{"a":123,"b":130,"type":"taxi","line":null},{"a":124,"b":131,"type":"taxi","line":null},{"a":125,"b":126,"type":"taxi","line":null},{"a":125,"b":133,"type":"taxi","line":null},{"a":125,"b":132,"type":"taxi","line":null},{"a":126,"b":133,"type":"taxi","line":null},{"a":127,"b":126,"type":"taxi","line":null},{"a":128,"b":138,"type":"taxi","line":null},{"a":128,"b":129,"type":"taxi","line":null},{"a":128,"b":139,"type":"taxi","line":null},{"a":129,"b":139,"type":"taxi","line":null},{"a":129,"b":138,"type":"taxi","line":null},{"a":130,"b":131,"type":"taxi","line":null},{"a":130,"b":124,"type":"taxi","line":null},{"a":130,"b":22,"type":"taxi","line":null},{"a":132,"b":133,"type":"taxi","line":null},{"a":134,"b":135,"type":"taxi","line":null},{"a":134,"b":127,"type":"taxi","line":null},{"a":134,"b":126,"type":"taxi","line":null},{"a":135,"b":136,"type":"taxi","line":null},{"a":135,"b":37,"type":"taxi","line":null},{"a":135,"b":127,"type":"taxi","line":null},{"a":136,"b":137,"type":"taxi","line":null},{"a":137,"b":138,"type":"taxi","line":null},{"a":137,"b":128,"type":"taxi","line":null},{"a":138,"b":139,"type":"taxi","line":null},{"a":139,"b":122,"type":"taxi","line":null},{"a":13,"b":11,"type":"metro","line":"A"},{"a":11,"b":9,"type":"metro","line":"A"},{"a":9,"b":15,"type":"metro","line":"A"},{"a":15,"b":16,"type":"metro","line":"A"},{"a":16,"b":18,"type":"metro","line":"A"},{"a":18,"b":21,"type":"metro","line":"A"},{"a":21,"b":22,"type":"metro","line":"A"},{"a":16,"b":24,"type":"metro","line":"B"},{"a":24,"b":26,"type":"metro","line":"B"},{"a":26,"b":28,"type":"metro","line":"B"},{"a":28,"b":30,"type":"metro","line":"B"},{"a":9,"b":6,"type":"metro","line":"C"},{"a":6,"b":5,"type":"metro","line":"C"},{"a":1,"b":3,"type":"metro","line":"D"},{"a":3,"b":4,"type":"metro","line":"D"},{"a":4,"b":11,"type":"metro","line":"D"},{"a":11,"b":26,"type":"metro","line":"D"},{"a":26,"b":34,"type":"metro","line":"D"},{"a":34,"b":37,"type":"metro","line":"D"},{"a":37,"b":39,"type":"metro","line":"D"},{"a":28,"b":29,"type":"tram","line":"T1"},{"a":29,"b":13,"type":"tram","line":"T1"},{"a":13,"b":12,"type":"tram","line":"T1"},{"a":12,"b":31,"type":"tram","line":"T1"},{"a":31,"b":24,"type":"tram","line":"T1"},{"a":24,"b":16,"type":"tram","line":"T1"},{"a":16,"b":44,"type":"tram","line":"T1"},{"a":13,"b":40,"type":"tram","line":"T2"},{"a":40,"b":41,"type":"tram","line":"T2"},{"a":41,"b":32,"type":"tram","line":"T2"},{"a":32,"b":35,"type":"tram","line":"T2"},{"a":35,"b":43,"type":"tram","line":"T2"},{"a":16,"b":22,"type":"tram","line":"T3"},{"a":24,"b":25,"type":"tram","line":"T4"},{"a":25,"b":41,"type":"tram","line":"T4"},{"a":41,"b":37,"type":"tram","line":"T4"},{"a":37,"b":39,"type":"tram","line":"T4"},{"a":35,"b":36,"type":"tram","line":"T5"},{"a":36,"b":38,"type":"tram","line":"T5"},{"a":28,"b":27,"type":"tram","line":"T6"},{"a":27,"b":37,"type":"tram","line":"T6"},{"a":37,"b":36,"type":"tram","line":"T6"},{"a":24,"b":16,"type":"bus","line":"C1"},{"a":16,"b":42,"type":"bus","line":"C1"},{"a":24,"b":23,"type":"bus","line":"C2"},{"a":23,"b":42,"type":"bus","line":"C2"},{"a":4,"b":9,"type":"bus","line":"C3"},{"a":9,"b":14,"type":"bus","line":"C3"},{"a":14,"b":15,"type":"bus","line":"C3"},{"a":15,"b":16,"type":"bus","line":"C3"},{"a":16,"b":18,"type":"bus","line":"C3"},{"a":18,"b":22,"type":"bus","line":"C3"},{"a":5,"b":7,"type":"bus","line":"C13"},{"a":7,"b":9,"type":"bus","line":"C13"},{"a":9,"b":10,"type":"bus","line":"C13"},{"a":10,"b":11,"type":"bus","line":"C13"},{"a":29,"b":28,"type":"bus","line":"C7"},{"a":28,"b":41,"type":"bus","line":"C7"},{"a":41,"b":26,"type":"bus","line":"C7"},{"a":26,"b":31,"type":"bus","line":"C7"},{"a":79,"b":80,"type":"boat","line":"Vaporetto Saône"},{"a":80,"b":81,"type":"boat","line":"Vaporetto Saône"},{"a":81,"b":4,"type":"boat","line":"Vaporetto Saône"},{"a":4,"b":68,"type":"boat","line":"Vaporetto Saône"},{"a":68,"b":83,"type":"boat","line":"Vaporetto Saône"},{"a":83,"b":13,"type":"boat","line":"Vaporetto Saône"},{"a":13,"b":84,"type":"boat","line":"Vaporetto Saône"},{"a":84,"b":40,"type":"boat","line":"Vaporetto Saône"},{"a":40,"b":85,"type":"boat","line":"Vaporetto Saône"},{"a":85,"b":30,"type":"boat","line":"Vaporetto Saône"},{"a":30,"b":86,"type":"boat","line":"Vaporetto Saône"},{"a":86,"b":88,"type":"boat","line":"Vaporetto Saône"}],"rivers":[{"name":"Saône","pts":[[360,20],[352,110],[358,210],[372,300],[358,400],[342,500],[358,610],[402,710],[452,800],[492,880],[520,960]]},{"name":"Rhône","pts":[[820,20],[806,130],[782,250],[748,370],[706,490],[666,600],[630,690],[598,780],[566,850],[540,915],[520,960]]}],"startCards":[70,130,139,56,24,97,90,134,49,80,113,55,44,83,132,28,77,35,14,137,58,85,68,53]};

/* ===================== CONSTANTES DE RÈGLES ===================== */
const TOTAL_ROUNDS = 22;            // règles Budapest fournies
const REVEALS = [3, 8, 13, 18];     // tours où Mister X se montre
const DET_TICKETS = { taxi: 10, bus: 6, tram: 5, metro: 4 }; // rééquilibré selon la couverture du plateau
const XINIT_TICKETS = { taxi: 4, bus: 3, tram: 3, metro: 3 }; // Mister X : peu de tickets (règle officielle : il récupère ceux des détectives)
const DET_COLORS = ["#38bdf8", "#22c55e", "#f59e0b", "#a855f7", "#fb7185"];
const LINE_COLORS = { A: "#e2231a", B: "#0072bc", C: "#f58220", D: "#00a04a" };
const TYPE_COLORS = { taxi: "#a89050", bus: "#1aa098", tram: "#8a3fb0", metro: "#e2231a", boat: "#4a92c8" };
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
function xMoves(pos, detPos, tickets) {
  // tickets : { taxi, bus, tram, metro, black }
  const normal = {}, black = {};
  const hasBlack = (tickets.black || 0) > 0;
  for (const e of ADJ[pos]) {
    if (detPos.has(e.to)) continue;
    // coup normal : nécessite un ticket du bon type (pas de navette sans ticket noir)
    if (e.type !== "boat" && (tickets[e.type] || 0) > 0) (normal[e.to] ||= new Set()).add(e.type);
    // ticket noir : n'importe quel transport, navette comprise
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
  state.mrx = { pos: xStart, start: xStart, revealedPos: null, revealedRound: null, log: [], tickets: { ...XINIT_TICKETS, black: 5, x2: 2 }, doubleActive: false, doubleType: null };
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

  // Mister X voit sa vraie position ; les détectives jamais (sauf révélation aux tours dédiés).
  // En écran partagé, la visibilité dépend UNIQUEMENT du tour (le même appareil joue les deux camps).
  const showXTrue = mode === "hotseat"
    ? (isXTurn && !hideX)            // hotseat : X visible seulement quand c'est son tour
    : (me?.role === "mrx");          // en ligne : seul le joueur Mister X voit X
  const detPosSet = useMemo(() => new Set(state.detectives.map((d) => d.pos)), [state.detectives]);

  // calcul des coups légaux pour l'acteur courant
  const legal = useMemo(() => {
    if (state.phase !== "playing") return {};
    if (isXTurn && iControlX) {
      const { normal, black } = xMoves(state.mrx.pos, detPosSet, state.mrx.tickets);
      // 2e coup d'un double : même moyen de transport que le 1er, billet noir interdit
      if (state.mrx.doubleActive) {
        const dt = state.mrx.doubleType;
        const out = {};
        for (const k in normal) if (normal[k].includes(dt)) out[k] = [dt];
        return out;
      }
      // 1er coup d'un double : uniquement les transports dont X possède ≥2 billets
      // (pour garantir un 2e coup du même type) ; billet noir exclu du double.
      if (doubleMove) {
        const out = {};
        for (const k in normal) {
          const ok = normal[k].filter((t) => (state.mrx.tickets[t] || 0) >= 2);
          if (ok.length) out[k] = ok;
        }
        return out;
      }
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
  }, [state, isXTurn, iControlX, useBlack, doubleMove, selPawn, detPosSet, myId, mode]);

  // auto-sélection d'un pion détective contrôlable
  useEffect(() => {
    if (state.turn === "detectives") {
      const mine = state.detectives.filter((d) => (mode === "hotseat" || d.owner === myId) && !d.moved);
      if (mine.length && (!selPawn || !mine.find((d) => d.id === selPawn))) setSelPawn(mine[0].id);
      if (!mine.length) setSelPawn(null);
    } else setSelPawn(null);
  }, [state.turn, state.detectives, myId, mode]);

  // au début d'un tour de Mister X (hotseat) : on réaffiche sa position pour lui ; on remet les atouts à zéro
  useEffect(() => {
    if (isXTurn) { setHideX(false); setUseBlack(false); setDoubleMove(false); }
  }, [isXTurn, state.round]);

  // détection blocage de Mister X (à son 1er coup, aucun mouvement possible → défaite)
  useEffect(() => {
    if (state.phase !== "playing" || !isXTurn || !iControlX) return;
    if (state.mrx.doubleActive) return; // le 2e coup d'un double est géré séparément
    const { normal, black } = xMoves(state.mrx.pos, detPosSet, state.mrx.tickets);
    if (Object.keys(normal).length === 0 && Object.keys(black).length === 0) {
      commit((s) => { s.phase = "over"; s.result = { winner: "detectives", reason: "Blocage ! Mister X est encerclé, aucun mouvement possible." }; return s; });
    }
  }, [state.phase, isXTurn, iControlX]);

  // 2e coup d'un double impossible (aucun même-transport accessible) → on termine le tour sans pénaliser
  useEffect(() => {
    if (state.phase !== "playing" || !isXTurn || !iControlX || !state.mrx.doubleActive) return;
    const { normal } = xMoves(state.mrx.pos, detPosSet, state.mrx.tickets);
    const dt = state.mrx.doubleType;
    const possible = Object.keys(normal).some((k) => normal[k].includes(dt));
    if (!possible) {
      commit((s) => { s.mrx.doubleActive = false; s.mrx.doubleType = null; endXTurn(s); return s; });
    }
  }, [state.phase, isXTurn, iControlX, state.mrx?.doubleActive, state.mrx?.pos]);

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
        const x = s.mrx;
        const startingDouble = doubleMove && !x.doubleActive; // 1er coup d'un double
        const inDouble = startingDouble || x.doubleActive;     // ce coup fait partie d'un double
        // Le billet noir ne se combine PAS avec le double : noir uniquement hors double.
        const isBlack = useBlack && !inDouble;
        x.pos = to;
        // Carte consignée → c'est elle que voient les détectives. Marquée « double » le cas échéant.
        x.log.push({ round: s.round, type: isBlack ? "black" : type, part: inDouble ? (x.doubleActive ? 2 : 1) : 1, double: inDouble });
        // consommation du ticket utilisé
        if (isBlack) x.tickets.black = Math.max(0, x.tickets.black - 1);
        else x.tickets[type] = Math.max(0, (x.tickets[type] || 0) - 1);
        if (startingDouble) {
          x.doubleActive = true;
          x.doubleType = type; // le 2e coup devra utiliser le même transport
          s.message = `Double coup : second déplacement en ${TYPE_LABEL[type]}.`;
        } else {
          if (x.doubleActive) { x.tickets.x2 = Math.max(0, x.tickets.x2 - 1); x.doubleActive = false; x.doubleType = null; }
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
        // la carte dépensée par le détective rejoint la réserve de Mister X (règle officielle)
        if (s.mrx && s.mrx.tickets) s.mrx.tickets[type] = (s.mrx.tickets[type] || 0) + 1;
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
                  <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">Vos cartes transport — Mister X</p>
                  <div className="mb-3"><TicketBar pawn={{ tickets: state.mrx.tickets }} /></div>
                  <p className="text-[11px] text-slate-500 mb-2">Chaque déplacement consomme une carte du transport choisi — et c'est cette carte qui est révélée aux détectives dans le carnet de route.</p>
                  <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">Atouts spéciaux</p>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <button onClick={() => { setUseBlack((v) => !v); setDoubleMove(false); }} disabled={state.mrx.tickets.black <= 0 || doubleMove || state.mrx.doubleActive}
                      className={"rounded-lg py-2 text-sm font-semibold border disabled:opacity-30 " + (useBlack ? "bg-slate-100 text-slate-900 border-slate-100" : "bg-slate-800 border-slate-700")}>
                      ⬛ Ticket noir ({state.mrx.tickets.black})
                    </button>
                    <button onClick={() => { setDoubleMove((v) => !v); setUseBlack(false); }} disabled={state.mrx.tickets.x2 <= 0 || state.mrx.doubleActive || useBlack}
                      className={"rounded-lg py-2 text-sm font-semibold border disabled:opacity-30 " + (doubleMove ? "bg-[#e2231a] border-[#e2231a]" : "bg-slate-800 border-slate-700")}>
                      ✕2 Double coup ({state.mrx.tickets.x2})
                    </button>
                  </div>
                  {state.mrx.doubleActive && <p className="text-xs text-amber-400 mb-2">Double coup en cours — jouez votre 2<sup>e</sup> déplacement en <b>{TYPE_LABEL[state.mrx.doubleType]}</b> (même transport imposé).</p>}
                  {doubleMove && !state.mrx.doubleActive && <p className="text-xs text-amber-400 mb-2">Double coup : les deux déplacements devront utiliser le <b>même</b> moyen de transport. Billet noir indisponible.</p>}
                  {useBlack && <p className="text-xs text-slate-300 mb-2">Le ticket noir masque votre moyen de transport et permet d'emprunter les navettes fluviales ⛴. (Incompatible avec le double coup.)</p>}
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

/* ===================== MONUMENTS DE LYON ===================== */
/* Repères emblématiques dessinés sur la carte (coordonnées calées sur la géographie du plateau). */
const LANDMARKS = [
  { type: "basilica", x: 235, y: 430, label: "Fourvière" },
  { type: "park",     x: 880, y: 215, rx: 95, ry: 78, label: "Parc de la Tête d'Or" },
  { type: "tower",    x: 800, y: 470, label: "Tour Part-Dieu" },
  { type: "square",   x: 530, y: 560, label: "Place Bellecour" },
  { type: "hoteldv",  x: 470, y: 320, label: "Hôtel de Ville" },
  { type: "museum",   x: 470, y: 905, label: "Confluence" },
  { type: "stadium",  x: 640, y: 920, label: "Gerland" },
  { type: "oldtown",  x: 320, y: 520, label: "Vieux Lyon" },
  { type: "hill",     x: 470, y: 150, label: "Croix-Rousse" },
];

function Landmark({ m }) {
  const { x, y, type } = m;
  const lbl = (dy) => <text x={x} y={y + dy} textAnchor="middle" fontSize="11" fill="#6b5d3e" fontWeight="700" fontStyle="italic" style={{ paintOrder: "stroke" }} stroke="#efe9dc" strokeWidth="2.5">{m.label}</text>;
  switch (type) {
    case "park":
      return (
        <g opacity="0.9">
          <ellipse cx={x} cy={y} rx={m.rx} ry={m.ry} fill="#bcd99a" stroke="#9cbf78" strokeWidth="1.5" />
          <ellipse cx={x + 18} cy={y + 12} rx={m.rx * 0.42} ry={m.ry * 0.34} fill="#86bce0" stroke="#6aa6d0" strokeWidth="1" opacity="0.85" />
          {[[-40,-30],[30,-38],[52,18],[-46,28],[5,-12]].map(([dx,dy],i)=>(
            <g key={i}><circle cx={x+dx} cy={y+dy} r="9" fill="#5e9e4e" opacity="0.7"/></g>
          ))}
          <text x={x} y={y - m.ry - 6} textAnchor="middle" fontSize="11" fill="#3a6e20" fontWeight="700" fontStyle="italic">{m.label}</text>
        </g>
      );
    case "basilica":
      return (
        <g>
          <rect x={x-16} y={y-10} width="32" height="26" rx="2" fill="#f3ede0" stroke="#c9b98e" strokeWidth="1.2"/>
          <rect x={x-13} y={y-26} width="9" height="18" fill="#f3ede0" stroke="#c9b98e" strokeWidth="1"/>
          <rect x={x+4} y={y-26} width="9" height="18" fill="#f3ede0" stroke="#c9b98e" strokeWidth="1"/>
          <polygon points={`${x-9},${y-26} ${x-8.5},${y-34} ${x-4},${y-26}`} fill="#cdbf94"/>
          <polygon points={`${x+4},${y-26} ${x+8.5},${y-34} ${x+9},${y-26}`} fill="#cdbf94"/>
          {lbl(30)}
        </g>
      );
    case "tower":
      return (
        <g>
          <rect x={x-9} y={y-34} width="18" height="48" rx="2" fill="#7fa8c9" stroke="#4e7795" strokeWidth="1.2"/>
          <polygon points={`${x-9},${y-34} ${x},${y-50} ${x+9},${y-34}`} fill="#9cc1de" stroke="#4e7795" strokeWidth="1"/>
          <line x1={x} y1={y-50} x2={x} y2={y-60} stroke="#4e7795" strokeWidth="1.5"/>
          {[-26,-16,-6,4].map((dy,i)=><line key={i} x1={x-7} y1={y+dy} x2={x+7} y2={y+dy} stroke="#4e7795" strokeWidth="0.7" opacity="0.6"/>)}
          {lbl(28)}
        </g>
      );
    case "square":
      return (
        <g>
          <rect x={x-26} y={y-16} width="52" height="32" rx="3" fill="#d9b96e" stroke="#b9954a" strokeWidth="1.3" opacity="0.85"/>
          <circle cx={x} cy={y} r="4" fill="#8a6d34"/>
          {lbl(30)}
        </g>
      );
    case "hoteldv":
      return (
        <g>
          <rect x={x-20} y={y-12} width="40" height="24" rx="1.5" fill="#efe6d2" stroke="#bba874" strokeWidth="1.2"/>
          <rect x={x-3} y={y-22} width="6" height="12" fill="#efe6d2" stroke="#bba874" strokeWidth="1"/>
          <polygon points={`${x-4},${y-22} ${x},${y-28} ${x+4},${y-22}`} fill="#bba874"/>
          {lbl(26)}
        </g>
      );
    case "museum":
      return (
        <g>
          <polygon points={`${x-22},${y+10} ${x-14},${y-12} ${x+16},${y-16} ${x+22},${y+10}`} fill="#c9d2da" stroke="#8a99a6" strokeWidth="1.3"/>
          {lbl(28)}
        </g>
      );
    case "stadium":
      return (
        <g>
          <ellipse cx={x} cy={y} rx="28" ry="18" fill="#9ccb7e" stroke="#6f9a54" strokeWidth="2"/>
          <ellipse cx={x} cy={y} rx="16" ry="9" fill="none" stroke="#fff" strokeWidth="1.3" opacity="0.8"/>
          {lbl(32)}
        </g>
      );
    case "oldtown":
      return (
        <g opacity="0.92">
          {[[-18,0,"#e0a86b"],[-6,-4,"#d4925a"],[6,0,"#e8b878"],[18,-2,"#d68f54"]].map(([dx,dy,c],i)=>(
            <rect key={i} x={x+dx-6} y={y+dy-8} width="12" height="20" rx="1" fill={c} stroke="#a06a38" strokeWidth="0.8"/>
          ))}
          {lbl(24)}
        </g>
      );
    case "hill":
      return (
        <g opacity="0.9">
          {[[-24,2],[-8,-3],[8,1],[24,-2]].map(([dx,dy],i)=>(
            <rect key={i} x={x+dx-5} y={y+dy-7} width="10" height="16" rx="1" fill="#cdb289" stroke="#a88a5e" strokeWidth="0.7"/>
          ))}
          {lbl(22)}
        </g>
      );
    default:
      return null;
  }
}

/* ===================== PLATEAU SVG ===================== */
function BoardSVG({ width, state, legal, onNodeClick, showXTrue, selPawn, hideX }) {
  const W = BOARD.width, H = BOARD.height;
  const detByPos = {};
  state.detectives?.forEach((d) => (detByPos[d.pos] = d));
  const xRevealed = state.mrx?.revealedPos;
  const xTrue = state.mrx?.pos;
  const isRevealRoundNow = xRevealed && state.mrx?.revealedRound === state.round;

  const edgeColor = (e) => e.type === "metro" ? (LINE_COLORS[e.line] || TYPE_COLORS.metro) : TYPE_COLORS[e.type];
  const edgeW = { taxi: 1.6, bus: 3.6, tram: 4, boat: 3, metro: 6 };

  /* Presqu'île = polygone entre Saône et Rhône */
  const saone = BOARD.rivers[0].pts;
  const rhone = BOARD.rivers[1].pts;
  const peninsula = [...saone, ...[...rhone].reverse()].map(p => p.join(",")).join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={width} height={width * H / W} style={{ display: "block" }}>
      <defs>
        {/* Trame de rues */}
        <pattern id="streetGrid" x="0" y="0" width="46" height="46" patternUnits="userSpaceOnUse">
          <rect width="46" height="46" fill="none" />
          <line x1="46" y1="0" x2="0" y2="0" stroke="#c7c0b2" strokeWidth="0.4" />
          <line x1="0" y1="0" x2="0" y2="46" stroke="#c7c0b2" strokeWidth="0.4" />
        </pattern>
        {/* Trame de bâtiments (îlots urbains) */}
        <pattern id="buildings" x="0" y="0" width="58" height="58" patternUnits="userSpaceOnUse">
          <rect x="6" y="6" width="16" height="13" fill="#d8d0bf" stroke="#c3baa6" strokeWidth="0.5" />
          <rect x="30" y="9" width="20" height="11" fill="#dcd4c4" stroke="#c3baa6" strokeWidth="0.5" />
          <rect x="10" y="28" width="13" height="20" fill="#d4ccba" stroke="#c3baa6" strokeWidth="0.5" />
          <rect x="32" y="32" width="18" height="16" fill="#dcd4c4" stroke="#c3baa6" strokeWidth="0.5" />
        </pattern>
      </defs>

      {/* ── Fond carte ── */}
      <rect x="0" y="0" width={W} height={H} fill="#e9e3d6" />
      <rect x="0" y="0" width={W} height={H} fill="url(#buildings)" opacity="0.5" />
      <rect x="0" y="0" width={W} height={H} fill="url(#streetGrid)" />

      {/* Presqu'île (teinte distincte entre les deux fleuves) */}
      <polygon points={peninsula} fill="#e6e0d0" opacity="0.6" />

      {/* ── Fleuves (halo + corps + reflet) ── */}
      {BOARD.rivers.map((r, i) => (
        <polyline key={"rh"+i} points={r.pts.map(p => p.join(",")).join(" ")}
          fill="none" stroke="#6aaee0" strokeWidth="46" strokeLinecap="round" strokeLinejoin="round" opacity="0.22" />
      ))}
      {BOARD.rivers.map((r, i) => (
        <polyline key={"rb"+i} points={r.pts.map(p => p.join(",")).join(" ")}
          fill="none" stroke="#4a92c8" strokeWidth="30" strokeLinecap="round" strokeLinejoin="round" opacity="0.72" />
      ))}
      {BOARD.rivers.map((r, i) => (
        <polyline key={"rl"+i} points={r.pts.map(p => p.join(",")).join(" ")}
          fill="none" stroke="#9fcfee" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      ))}
      {/* Noms des fleuves */}
      <text x="330" y="560" fontSize="15" fill="#1e5080" opacity="0.85" fontStyle="italic" fontWeight="700"
        transform="rotate(78 330 560)" textAnchor="middle">la Saône</text>
      <text x="690" y="600" fontSize="15" fill="#1e5080" opacity="0.85" fontStyle="italic" fontWeight="700"
        transform="rotate(72 690 600)" textAnchor="middle">le Rhône</text>

      {/* ── Monuments emblématiques ── */}
      {LANDMARKS.map((m, i) => <Landmark key={i} m={m} />)}

      {/* ── Arêtes transport ── */}
      {/* Taxi en dessous */}
      {BOARD.edges.filter(e => e.type === "taxi").map((e, i) => {
        const a = NODE[e.a], b = NODE[e.b];
        return <line key={"tx"+i} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
          stroke="#9c8448" strokeWidth="1.7" opacity="0.4" strokeLinecap="round" />;
      })}
      {/* Bus, tram, bateau, métro (avec liseré clair pour lisibilité) */}
      {["bus","tram","boat","metro"].map(tp =>
        BOARD.edges.filter(e => e.type === tp).map((e, i) => {
          const a = NODE[e.a], b = NODE[e.b];
          const col = edgeColor(e);
          return (
            <g key={tp+i}>
              <line x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke="#ffffff" strokeWidth={edgeW[tp]+2.4} strokeLinecap="round" opacity="0.55" />
              <line x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke={col} strokeWidth={edgeW[tp]} opacity={0.95}
                strokeDasharray={tp === "boat" ? "9 7" : undefined} strokeLinecap="round" />
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
                <circle cx={n.x} cy={n.y} r="21" fill="#fde04733" stroke="none" />
                <circle cx={n.x} cy={n.y} r="18" fill="none" stroke="#facc15" strokeWidth="3" opacity="0.95" />
              </>
            )}
            <circle cx={n.x} cy={n.y} r={n.metro ? 12 : 9}
              fill={n.metro ? "#16213d" : "#314059"}
              stroke={n.metro ? "#f1f4fa" : "#9fb0c6"}
              strokeWidth={n.metro ? 2.5 : 1.5} />
            <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize={n.metro ? 9.5 : 8}
              fill="#e2eaf6" fontWeight="700">{n.id}</text>
            {n.name && (
              <g>
                <rect x={n.x - (n.name.length * 3.1 + 6)} y={n.y - 28} width={n.name.length * 6.2 + 12} height="15" rx="3" fill="#16213dd9" />
                <text x={n.x} y={n.y - 17.5} textAnchor="middle" fontSize="10" fill="#bcd4f5" fontWeight="700">{n.name}</text>
              </g>
            )}
          </g>
        );
      })}

      {/* Dernière position connue de Mister X (visible des détectives uniquement) */}
      {xRevealed && (!showXTrue || xRevealed !== xTrue) && (() => {
        const n = NODE[xRevealed];
        return (
          <g>
            {isRevealRoundNow && <circle cx={n.x} cy={n.y} r="24" fill="#e2231a22" stroke="#e2231a" strokeWidth="2" opacity="0.7" />}
            <circle cx={n.x} cy={n.y} r="16" fill="#2a0e0e" stroke="#e2231a" strokeWidth="3"
              strokeDasharray={isRevealRoundNow ? undefined : "4 3"} />
            <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize="13" fill="#ff5a4d" fontWeight="900">X</text>
            <rect x={n.x - 26} y={n.y - 30} width="52" height="13" rx="2" fill="#7f1d1d" />
            <text x={n.x} y={n.y - 20} textAnchor="middle" fontSize="9" fill="#fecaca" fontWeight="700">
              {isRevealRoundNow ? `révélé T${state.mrx.revealedRound}` : `vu T${state.mrx.revealedRound}`}
            </text>
          </g>
        );
      })()}

      {/* Pions détectives */}
      {state.detectives?.map((d) => {
        const n = NODE[d.pos];
        const isSelected = selPawn === d.id;
        return (
          <g key={d.id}>
            {isSelected && <circle cx={n.x} cy={n.y} r="18" fill="none" stroke="#ffffff80" strokeWidth="2" strokeDasharray="3 2" />}
            <circle cx={n.x} cy={n.y} r="13" fill={d.color} stroke="#fff" strokeWidth="2.5" opacity={isSelected ? 1 : 0.9} />
            <text x={n.x} y={n.y + 4.5} textAnchor="middle" fontSize="12" fill="#0f172a" fontWeight="900">{d.label}</text>
          </g>
        );
      })}

      {/* Mister X — visible uniquement par le joueur Mister X (jamais par les détectives) */}
      {showXTrue && xTrue && !hideX && (() => {
        const n = NODE[xTrue];
        return (
          <g>
            <circle cx={n.x} cy={n.y} r="19" fill="#e2231a33" stroke="none" />
            <circle cx={n.x} cy={n.y} r="14" fill="#16060a" stroke="#e2231a" strokeWidth="3.5" />
            <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize="14" fill="#ff5a4d" fontWeight="900">X</text>
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
              <div className="relative w-9 h-9 rounded-md grid place-items-center text-lg border"
                style={{ background: m.type === "black" ? "#0b0b0b" : "#241d12", borderColor: m.double ? "#e2231a" : m.type === "black" ? "#444" : "#5a4a2a" }}
                title={`Tour ${m.round} · ${TYPE_LABEL[m.type]}${m.double ? " · double coup" : ""}`}>
                {TYPE_ICON[m.type]}
                {m.double && <span className="absolute -top-1.5 -right-1.5 text-[8px] font-black bg-[#e2231a] text-white rounded px-0.5 leading-tight">×2</span>}
              </div>
              <span className="text-[9px] text-amber-700 mt-0.5">T{m.round}{m.part === 2 ? "b" : ""}</span>
            </div>
          ))}
        </div>
      )}
      <p className="text-[10px] text-slate-500 mt-2">Révélations aux tours {REVEALS.join(", ")}. Le badge <span className="text-[#e2231a] font-bold">×2</span> indique un double coup.</p>
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

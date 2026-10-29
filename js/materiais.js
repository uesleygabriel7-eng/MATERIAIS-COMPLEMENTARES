// ==========================================
// DADOS E PEÇAS (PADRÃO INICIAL)
// ==========================================
const initialMaterialsData = [
  {
    "title": "PILAR",
    "rows": [
      { "row": 6, "cod": "11231", "desc": "PERFIL ACO RET ZB APOIO SIMPLES PINO SOLDADO", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "CONSOLE PLACA SIMPLES", "isSubheader": false },
      { "row": 7, "cod": "11232", "desc": "PERFIL ACO RET ZB APOIO DUPLO SOLDADO", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "CONSOLE PLACA DUPLO", "isSubheader": false },
      { "row": 8, "cod": "8394", "desc": "BARRA LAMI ZB 1\" x 750 X 100 1R 200", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "HASTE 1\" P/ BRAÇO 25X40", "isSubheader": false },
      { "row": 9, "cod": "11655", "desc": "BARRA LAMI ZB 1\" X 950 X 100 1R200", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "HASTE 1\"P/BRAÇO 30X50 E 60", "isSubheader": false },
      { "row": 10, "cod": "8392", "desc": "PORCA SEXT ZB 1\"", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "PORCA 1\"", "isSubheader": false },
      { "row": 11, "cod": "8393", "desc": "PERFIL ACO RET ZB 75X75X1\" #1/4", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "ARRUELA 75x75 C/ FURO 1\"", "isSubheader": false },
      { "row": 12, "cod": "10442", "desc": "PORCA SEXT ZB 1/2", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "PORCA 5/8\" (TESOURA)", "isSubheader": false },
      { "row": 13, "cod": "10443", "desc": "PERFIL ACO QUAD ZB 50X50X1/2 #1/4", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "ARRUELA 50X50 C/ FURO 5/8\" (TESOURA)", "isSubheader": false },
      { "row": 14, "cod": "8420", "desc": "BARRA LAMI ZB 1/2 X 235 X 85 X 40 1R 150", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "HASTE 5/8\" 235X85X40 1R 150 (TESOURA)", "isSubheader": false },
      { "row": 15, "cod": "4484", "desc": "M DE TUBO PVC ESGOTO PB 150MM", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "TUBO DE QUEDA 150MM", "isSubheader": false },
      { "row": 16, "cod": "4345", "desc": "M DE TUBO PVC ESGOTO PB 100MM", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "TUBO DE QUEDA 100MM", "isSubheader": false },
      { "row": 17, "cod": "4344", "desc": "M DE TUBO PVC ESGOTO PB 75MM", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "TUBO DE QUEDA 75MM", "isSubheader": false },
      { "row": 18, "cod": "12325", "desc": "JOELHO 45 PVC RÍGIDO ESGOTO 150MM", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "", "isSubheader": false },
      { "row": 19, "cod": "5381", "desc": "JOELHO 45 PVC RÍGIDO ESGOTO 100MM", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "", "isSubheader": false },
      { "row": 20, "cod": "5380", "desc": "JOELHO 45 PVC RÍGIDO ESGOTO 75MM", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "", "isSubheader": false },
      { "row": 21, "cod": "5387", "desc": "JOELHO 90 PVC RÍGIDO ESGOTO 150MM", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "", "isSubheader": false },
      { "row": 22, "cod": "5386", "desc": "JOELHO 90 PVC RÍGIDO ESGOTO 100MM", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "", "isSubheader": false },
      { "row": 23, "cod": "5385", "desc": "JOELHO 90 PVC RÍGIDO ESGOTO 75MM", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "", "isSubheader": false },
      { "row": 24, "cod": "5416", "desc": "LUVA PVC ESGOTO 75MM", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "", "isSubheader": false },
      { "row": 25, "cod": "5417", "desc": "LUVA PVC ESGOTO 100MM", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "", "isSubheader": false },
      { "row": 26, "cod": "5418", "desc": "LUVA PVC ESGOTO 150MM", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "", "isSubheader": false },
      { "row": 27, "cod": "11233", "desc": "PARABOLT ZB 5/8 X 4 1/2", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "P CONSOLE SIMPLES E DUPLO", "isSubheader": false }
    ]
  },
  {
    "title": "COBERTURA/ ESTRUTURA",
    "rows": [
      { "row": 31, "cod": "8415", "desc": "PERFIL ACO RET ZB 30X160X100X160X30 2F", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "CARTOLA", "isSubheader": false },
      { "row": 32, "cod": "8411", "desc": "PERFIL ACO RET ZB 1/8 X 200 X 30X92X30", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "CHAPA UNIÃO DE TERÇA", "isSubheader": false },
      { "row": 33, "cod": "12010", "desc": "HASTE TELHA DOB ZB 3/8 X 310 X 80 1R 150", "formula": "=C32", "default": "", "pedido": "FÁBRICA", "complementar": "HASTE DE UNIÃO DE TERÇA I", "isSubheader": false },
      { "row": 34, "cod": "11630", "desc": "HASTE DE TELHA ZB 3/8 X 120 X 80 1R 80", "formula": "=C31*2", "default": "", "pedido": "FÁBRICA", "complementar": "HASTE PARA CARTOLA/OITÃO", "isSubheader": false },
      { "row": 35, "cod": "5272", "desc": "PORCA SEXT ZB 3/8", "formula": "=C33+C34", "default": "", "pedido": "FÁBRICA", "complementar": "PORCA 3/8\" (CHAPA DE UNIÃO E CARTOLA)", "isSubheader": false },
      { "row": 36, "cod": "12362", "desc": "BARRA LAMI ZB 1/2 X 620 X 100 1R 200", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "CHUMBADOR 1/2'' 620mmx100mm (TERÇA T - UNIÃO)", "isSubheader": false },
      { "row": 37, "cod": "8398", "desc": "PORCA SEXT ZB 1/2", "formula": "=C36", "default": "", "pedido": "FÁBRICA", "complementar": "PORCA 1/2\"", "isSubheader": false },
      { "row": 38, "cod": "12371", "desc": "PERFIL ACO QUAD 90X90X1/2#1/4", "formula": "=C36", "default": "", "pedido": "FÁBRICA", "complementar": "ARRUELA 90x90 COM FURO 1/2'' (TERÇA T - UNIÃO)", "isSubheader": false },
      { "row": 39, "cod": "8397", "desc": "ARRUELA ZB ABA LARGA 1/2", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "ARRUELA 1/2'\"", "isSubheader": false },
      { "row": 40, "cod": "8448", "desc": "GANCHO TELHA FIBROCIMENTO", "formula": null, "default": "", "pedido": "ESTOQUE", "complementar": "GANCHO TELHA FIBROCIMENTO", "isSubheader": false },
      { "row": 41, "cod": "12330", "desc": "CHAPA BUME GIGANTE 3/8X860X200 20FUROS", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "CHAPA BUME 20 FUROS", "isSubheader": false },
      { "row": 42, "cod": "", "desc": "CHAPA BUME GRANDE", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "CHAPA BUME 8 FUROS", "isSubheader": false },
      { "row": 43, "cod": "11593", "desc": "CLIPS 1/4\"", "formula": null, "default": "", "pedido": "ESTOQUE", "complementar": "CLIPS 1/4\" (CONTRAVENTAMENTO)", "isSubheader": false },
      { "row": 44, "cod": "8410", "desc": "CLIPS 3/8\"", "formula": null, "default": "", "pedido": "ESTOQUE", "complementar": "CLIPS 3/8\"", "isSubheader": false },
      { "row": 45, "cod": "8408", "desc": "PERFIL ACO QUAD ZB 50X50X1/2 #1/4", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "ARRUELA 50X50 C/FURO 1/2\" ( TERÇA T - OITÃO E OLHAL 600)", "isSubheader": false },
      { "row": 46, "cod": "11535", "desc": "HASTE DE TELHA ZB 1/2 X 200 2R 80", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "HASTE 1/2\" x 200 - 2R ( CHAPA BUME)", "isSubheader": false },
      { "row": 47, "cod": "8406", "desc": "HASTE TELHA OLHAL ZB 1/2 X 200 1R 150", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "PAR. OLHAL 1/2\" x 200mm", "isSubheader": false },
      { "row": 48, "cod": "8761", "desc": "HASTE TELHA OLHAL ZB 1/2 X 600 1R 150", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "PAR. OLHAL 1/2\" x 600mm", "isSubheader": false },
      { "row": 49, "cod": "9545", "desc": "CABO DE AÇO ∅ 1/4\" 6,4mm", "formula": null, "default": "", "pedido": "ESTOQUE", "complementar": "CABO DE AÇO ∅ 1/4\" 6,4mm", "isSubheader": false },
      { "row": 52, "cod": "", "desc": "TIRANTES", "formula": null, "default": "", "pedido": "", "complementar": "TIRANTES", "isSubheader": true },
      { "row": 53, "cod": "8771", "desc": "PROLONGADORA 5/8 X 110mm", "formula": null, "default": "20M", "pedido": "FÁBRICA", "complementar": "", "isSubheader": false },
      { "row": 54, "cod": "12669", "desc": "PROLONGADORA 3/4 X 110mm", "formula": null, "default": "25M", "pedido": "FÁBRICA", "complementar": "OBS. TIRANTES", "isSubheader": false },
      { "row": 55, "cod": "8787", "desc": "PROLONGADORA 7/8 X 110mm", "formula": null, "default": "30M", "pedido": "FÁBRICA", "complementar": "2 barras 6m + 2barra 3,25m", "isSubheader": false },
      { "row": 56, "cod": "12670", "desc": "PROLONGADOR 1\" X 110mm", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "", "isSubheader": false },
      { "row": 57, "cod": "12673", "desc": "BARRA LAMI ZB 5/8\" 600 - 2 ROSCA", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "", "isSubheader": false },
      { "row": 58, "cod": "12673", "desc": "TIRANTE #5/8 ZINCADO POR METRO (16MM)", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "", "isSubheader": false },
      { "row": 59, "cod": "12674", "desc": "TIRANTE #3/4 ZINCADO POR METRO (19MM)", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "PROLONGADORA - encontro de cabos (6m)", "isSubheader": false },
      { "row": 60, "cod": "12675", "desc": "TIRANTE #7/8 ZINCADO POR METRO (22MM)", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "ARRUELA  - 1x em cada lado do tirante total", "isSubheader": false },
      { "row": 61, "cod": "12676", "desc": "TIRANTE #1\" ZINCADO POR METRO", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "PORCA - 2x em cada lado do tirante total", "isSubheader": false },
      { "row": 62, "cod": "12140", "desc": "TIRANTE 5/8 - ARRUELA 75X75X5/8#1/4", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "", "isSubheader": false },
      { "row": 63, "cod": "12370", "desc": "TIRANTE 3/4-ARRUELA 75X75X3/4#1/4", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "", "isSubheader": false },
      { "row": 64, "cod": "8814", "desc": "TIRANTE 7/8 - ARRUELA 75X75X7/8#1/4", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "", "isSubheader": false },
      { "row": 65, "cod": "8393", "desc": "TIRANTE 1\" - ARRUELA 75X75X1\"#1/4", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "", "isSubheader": false },
      { "row": 66, "cod": "10442", "desc": "TIRANTE - PORCA SEXT 5/8", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "", "isSubheader": false },
      { "row": 67, "cod": "11523", "desc": "TIRANTE - PORCA SEXT 3/4", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "", "isSubheader": false },
      { "row": 68, "cod": "12672", "desc": "TIRANTE - PORCA SEXT 7/8", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "", "isSubheader": false },
      { "row": 69, "cod": "8392", "desc": "TIRANTE - PORCA SEXT 1\"", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "", "isSubheader": false }
    ]
  },
  {
    "title": "TELHAS",
    "rows": [
      { "row": 73, "cod": "13126", "desc": "PARAF. AUTOBROCANTE (ISO. 30 ONDA ALTA)", "formula": "=ROUNDUP((((G73/(0.98)*3)*H73)*1.1)*I73, 0)", "default": "", "pedido": "ESTOQUE", "complementar": "ISOTÉRMICA", "isSubheader": false },
      { "row": 74, "cod": "8713", "desc": "PARAF. AUTOBROCANTE (TP SIMPLES ONDA BAIXA)", "formula": null, "default": "", "pedido": "ESTOQUE", "complementar": "ALUZINC", "isSubheader": false },
      { "row": 75, "cod": "13125", "desc": "PARAF. COSTURA", "formula": "=ROUNDUP((((G76/(0.98)*3)*H76)*1.1)*I76, 0)", "default": "", "pedido": "ESTOQUE", "complementar": "UNIÃO ( TRANSPASSE DE 30CM)", "isSubheader": false },
      { "row": 76, "cod": "9514", "desc": "PARAF. AUTOBROCANTE (ISO. 30 ONDA BAIXA)", "formula": null, "default": "", "pedido": "ESTOQUE", "complementar": "FECHAMENTO LATERAL", "isSubheader": false }
    ]
  },
  {
    "title": "VIGA I",
    "rows": [
      { "row": 80, "cod": "8436", "desc": "BARRA LAMI ZB 1\" X 1200 X 100 1R 200", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "HASTE ROSCADA 1\" - 120cm", "isSubheader": false },
      { "row": 81, "cod": "8392", "desc": "PORCA SEXT ZB 1\"", "formula": "=C80", "default": "", "pedido": "FÁBRICA", "complementar": "PORCA 1\"", "isSubheader": false },
      { "row": 82, "cod": "8393", "desc": "PERFIL ACO RET ZB 75X75X1\" #1/4", "formula": "=C80", "default": "", "pedido": "FÁBRICA", "complementar": "ARRUELA 75X75 FURO 1\"", "isSubheader": false }
    ]
  },
  {
    "title": "VIGA CALHA",
    "rows": [
      { "row": 86, "cod": "8424", "desc": "NEOPRENE TIPO V. CALHA 40", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "NEOPRENE TIPO V. CALHA 40", "isSubheader": false },
      { "row": 87, "cod": "8423", "desc": "PERFIL ACO RET ZB CALHA 55X155X55 1F 1/2", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "CHAPA UNIÃO CALHA", "isSubheader": false },
      { "row": 88, "cod": "5416", "desc": "LUVA PVC ESGOTO 75MM", "formula": null, "default": " ", "pedido": "FÁBRICA", "complementar": "TUBO 75mm", "isSubheader": false },
      { "row": 89, "cod": "5417", "desc": "LUVA PVC ESGOTO 100MM", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "TUBO 100mm ( Tubo 150 usar 2x 100mm)", "isSubheader": false },
      { "row": 90, "cod": "12362", "desc": "BARRA LAMI ZB 1/2 X 620 X 100 1R 200", "formula": "=C87", "default": "", "pedido": "FÁBRICA", "complementar": "HASTE UNIÃO CALHA", "isSubheader": false },
      { "row": 91, "cod": "3554", "desc": "VEDAPREN - PRETO (6703640)", "formula": "=C87/10", "default": "", "pedido": "ESTOQUE", "complementar": "1 GALÃO FAZ 10 JUNÇÃO DE CALHA", "isSubheader": false },
      { "row": 92, "cod": "8580", "desc": "MANTA ASFÁLTICA ALUMINIZADA 10CM", "formula": "=IF(G93=\"40x62\", C90*2.15, 0)", "default": "", "pedido": "ESTOQUE", "complementar": "CALHA 40X62 = 2,15M POR JUNÇÃO.", "isSubheader": false },
      { "row": 93, "cod": "8580", "desc": "MANTA ASFÁLTICA ALUMINIZADA 10CM", "formula": "=IF(G93=\"40x60\", C90*2.65, 0)", "default": "", "pedido": "ESTOQUE", "complementar": "CALHA 40X60=2,65M POR JUNÇÃO.", "isSubheader": false }
    ]
  },
  {
    "title": "LAJE PI/FORRO/CONTENÇÃO",
    "rows": [
      { "row": 97, "cod": "8427", "desc": "NEOPRENE TIPO LAJE PI", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "NEOPRENE TIPO LAJE PI", "isSubheader": false },
      { "row": 98, "cod": "12363", "desc": "BARRA LAMI ZB 1/2 X 400 X 100 1R 150", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "HASTE 400x70 1/2\"", "isSubheader": false },
      { "row": 99, "cod": "12362", "desc": "BARRA LAMI ZB 1/2 X 620 X 100 1R 200", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "HASTE 600X70 1/2\"", "isSubheader": false },
      { "row": 100, "cod": "", "desc": "CHAPA 50x200x8mm C/ FURO de 1/2''", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "CHAPA 50x200x8mm C/ FURO de 1/2'' (UNIÃO CONTENÇÃO)", "isSubheader": false }
    ]
  },
  {
    "title": "PLACA DE FECHAMENTO",
    "rows": [
      { "row": 105, "cod": "11106", "desc": "CALHA FIX 10", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "CALHA FIX 10", "isSubheader": false },
      { "row": 106, "cod": "11106", "desc": "CALHA FIX 10 (20 CM)", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "CALHA FIX 10 (20CM)", "isSubheader": false },
      { "row": 107, "cod": "11106", "desc": "CALHA FIX 12", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "CALHA FIX 12", "isSubheader": false },
      { "row": 108, "cod": "11108", "desc": "MATAJUNTA", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "MATAJUNTA", "isSubheader": false },
      { "row": 109, "cod": "12915", "desc": "CANTONEIRA 15X15 1/4\" 3M", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "CANTONEIRA 15X15 1/4\" 3M", "isSubheader": false },
      { "row": 110, "cod": "12376", "desc": "PERFIL ACO RET ZB CONSOLE SOLDADO", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "CONSOLE SOLDADO FÊMEA DO ENCAIXE DA PLACA", "isSubheader": false },
      { "row": 111, "cod": "8408", "desc": "PERFIL AÇO QUAD. ZB 1/4\" 50X50 - FURO 1/2\"", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "FIXAÇÃO PLACAS QUANDO É INDIVIDUAL.", "isSubheader": false },
      { "row": 112, "cod": "11842", "desc": "PERFIL AÇO RET ZB 200X50#5/16 FURO 1/2", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "FIXAÇÃO PLACAS (UNIÃO QUANDO FIXA 2 PLACAS)", "isSubheader": false },
      { "row": 113, "cod": "12294", "desc": "LIFT PARA IÇAMENTO DAS PLACAS #3/8", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "LIFT IÇAMENTO DE PLACA 3/8\"", "isSubheader": false }
    ]
  },
  {
    "title": "VIGA TRANSIÇÃO",
    "rows": [
      { "row": 117, "cod": "8430", "desc": "NEOPRENE TIPO V. TRANSIÇÃO", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "NEOPRENE TIPO V. TRANSIÇÃO", "isSubheader": false },
      { "row": 118, "cod": "8436", "desc": "BARRA LAMI ZB 1\" X 1200 X 100 1R 200", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "HASTE 1\"1200X100", "isSubheader": false },
      { "row": 119, "cod": "11655", "desc": "BARRA LAMI ZB 1\" X 950 X 100 1R200", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "HASTE 1\"950X100", "isSubheader": false },
      { "row": 120, "cod": "8393", "desc": "PERFIL ACO RET ZB 75X75X1\" #1/4", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "ARRUELA 75x75 C/ FURO 1\"", "isSubheader": false },
      { "row": 121, "cod": "8392", "desc": "PORCA SEXT ZB 1\"", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "PORCA 1\"", "isSubheader": false }
    ]
  },
  {
    "title": "USO DIVERSO OBRA",
    "rows": [
      { "row": 125, "cod": "8435", "desc": "PARABOLT PARA FIXAÇÃO DA CALHA U", "formula": "=(C105*3)+(C106*3)+(C107*3)", "default": "", "pedido": "ESTOQUE", "complementar": "CADA CALHA DE FIXAÇÃO 3 PARABOLT", "isSubheader": false },
      { "row": 126, "cod": "11199", "desc": "PARABOLT 1/2\"X7", "formula": "=C111+C112", "default": "", "pedido": "ESTOQUE", "complementar": "PARA FIXAÇÃO DIRETA DE PLACA NO PILAR", "isSubheader": false },
      { "row": 127, "cod": "10752", "desc": "PARABOLT 3/8\"", "formula": "=C108*2", "default": "", "pedido": "ESTOQUE", "complementar": "2 PARABOLT POR MATAJUNTA", "isSubheader": false },
      { "row": 128, "cod": "10664", "desc": "TUBO RETANGULAR GALVANIZADO 30X40X120MM (6m)", "formula": "=ROUND(G128/6,0)", "default": "", "pedido": "FÁBRICA", "complementar": "TERÇA/CALHA", "isSubheader": false },
      { "row": 129, "cod": "12835", "desc": "BROCA SDS PLUS 10X160MM", "formula": "=ROUNDUP((C127/40),0)", "default": "", "pedido": "ESTOQUE", "complementar": "CADA 40 PARABOLT 3/8\" 1 BROCA", "isSubheader": false },
      { "row": 130, "cod": "10297", "desc": "BROCA SDS PLUS 13X260MM", "formula": "=ROUNDUP((C126/40),0)", "default": "", "pedido": "ESTOQUE", "complementar": "CADA 40 PARABOLT 1/2\"", "isSubheader": false },
      { "row": 131, "cod": "10888", "desc": "DISCO DIAMANTADO 230 MM SEGMENTADO 9\"", "formula": null, "default": 1, "pedido": "ESTOQUE", "complementar": "1 POR OBRA", "isSubheader": false },
      { "row": 132, "cod": "9468", "desc": "SELANTE DE POLIURETANO 600ML", "formula": "=ROUNDUP((H132+I132+J132)/2,0)", "default": "", "pedido": "ESTOQUE", "complementar": "CADA BANANA DE SELANTE 600ML FAZ 2M LINEAR DE VEDAÇÃO.", "isSubheader": false }
    ]
  },
  {
    "title": "NEOPRENE",
    "rows": [
      { "row": 136, "cod": "11752", "desc": "APOIO NEOPRENE 17X18X1", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "PARA CONSOLES 20X20 - VIGAS CINTAS E MEZANINO", "isSubheader": false },
      { "row": 137, "cod": "11754", "desc": "APOIO NEOPRENE 17X11X5 - 17X11X½", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "PARA LAJE PI 18/28/38/44 - 1 PÇ POR BANCO", "isSubheader": false },
      { "row": 138, "cod": "11751", "desc": "APOIO NEOPRENE 19X22X1 CM", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "PARA CONSOLES 20X25 - VIGAS CINTAS E MEZANINOS C/ LARGURA DE 25", "isSubheader": false },
      { "row": 139, "cod": "13184", "desc": "MOLDURA DE EVA 40X40X1CM", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "MOLDURA PARA VIGA CALHA 40", "isSubheader": false },
      { "row": 140, "cod": "13185", "desc": "T 580X280X100X5MM", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "BRAÇO 30X60 E 50 1 EM CADA BRAÇO (PONTA DA CUMEEIRA)", "isSubheader": false },
      { "row": 141, "cod": "13283", "desc": "T- PEQUENO 23X37X5X½", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "BRAÇO 25X40 1 EM CADA BRAÇO (PONTA DA CUMEEIRA)", "isSubheader": false },
      { "row": 142, "cod": "11753", "desc": "MOLDURA 40X35X1", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "USO EM PEÇA ESPECIAL.", "isSubheader": false },
      { "row": 143, "cod": "11810", "desc": "MOLDURA 40X25X1", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "USO PARA APOIO DE VIGA CALHA QUE NÃO POSSUI CONSOLE CALHA", "isSubheader": false },
      { "row": 144, "cod": "13291", "desc": "APOIO 250X250X10", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "APOIO PARA VIGAS CINTA E MEZANINO DE 30 DE LARGURA E VIGA I", "isSubheader": false },
      { "row": 145, "cod": "13294", "desc": "APOIO NEOPRENE 230X180X5MM", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "TERÇAS DE FECHAMENTO 20X20 PARA PILAR DE 25 DE LARGURA", "isSubheader": false },
      { "row": 146, "cod": "12261", "desc": "APOIO NEOPRENE 26X18X5 - 26X18X½", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "TERÇAS DE FECHAMENTO 20X20 PARA PILAR DE 30 DE LARGURA", "isSubheader": false },
      { "row": 147, "cod": "13290", "desc": "APOIO NEOPRENE 36X36X10", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "PARA CONSOLES ESPECIAIS COM VIGAS DE 40 DE LARGURA", "isSubheader": false },
      { "row": 148, "cod": "12260", "desc": "APOIO NEOPRENE 36X36X1", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "PARA CONSOLES DE 40 DE LARGURA COM MAIS DE 1 FURO", "isSubheader": false },
      { "row": 149, "cod": "13289", "desc": "APOIO NEOPRENE 20X20X1", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "PARA CONSOLES 25X25 DE MEZANINO", "isSubheader": false },
      { "row": 150, "cod": "13287", "desc": "APOIO NEOPRENE 18X17X½", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "CONSOLES DE TERÇA DE FECHAMENTO POR DENTRO DO PILAR", "isSubheader": false },
      { "row": 151, "cod": "13286", "desc": "APOIO NEOPRENE 40X40X1 CM", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "CONSOLES ESPECIAIS (EX. VIGAS 50 LARGURA)", "isSubheader": false },
      { "row": 152, "cod": "13284", "desc": "APOIO NEOPRENE 17X10X1", "formula": null, "default": "", "pedido": "FÁBRICA", "complementar": "CONSOLE DE VIGAS CINTAS DE 15 DE LARGURA E BALDRAMES COM BANCO", "isSubheader": false }
    ]
  }
];

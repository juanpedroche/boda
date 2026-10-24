// Crea el formulario de confirmación de asistencia y una hoja de cálculo con las respuestas.
// Uso: https://script.google.com → Nuevo proyecto → pegar este código → Ejecutar "crearFormulario".
function crearFormulario() {
  var form = FormApp.create('Boda Juan & Nerea · Confirmación de asistencia');
  form.setDescription(
    '¡Nos casamos! Sábado, 19 de junio de 2027 · Salones Mabel, Tomelloso.\n\n' +
    'Ayúdanos a organizarlo todo confirmando tu asistencia. ' +
    'Si venís varias personas, basta con que una rellene el formulario por todo el grupo.'
  );
  form.setConfirmationMessage('¡Gracias! Hemos recibido tu respuesta. Si necesitas cambiar algo, puedes volver a editarla con el enlace de este correo o escribirnos directamente. 💚');
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);

  // ---------- Sección 1: datos básicos ----------
  form.addTextItem().setTitle('Nombre y apellidos').setRequired(true);
  var asistencia = form.addMultipleChoiceItem().setTitle('¿Vendrás a la boda?').setRequired(true);
  form.addTextItem().setTitle('Teléfono de contacto')
    .setHelpText('Por si necesitamos avisarte de algún cambio.');

  // ---------- Sección 2: detalles (solo si viene) ----------
  var detalles = form.addPageBreakItem().setTitle('Detalles de tu asistencia');
  form.addListItem().setTitle('¿Cuántos adultos venís en total (contándote a ti)?')
    .setChoiceValues(['1', '2', '3', '4', '5', '6']).setRequired(true);
  form.addListItem().setTitle('¿Cuántos niños (menores de 12 años)?')
    .setChoiceValues(['0', '1', '2', '3', '4', '5']).setRequired(true);
  form.addParagraphTextItem().setTitle('Nombre y apellidos de tus acompañantes')
    .setHelpText('Uno por línea. Si hay niños, indica su edad.');
  form.addCheckboxItem().setTitle('¿Alguien del grupo tiene alergias, intolerancias o una dieta especial?')
    .setChoiceValues([
      'Ninguna',
      'Celiaquía / sin gluten',
      'Intolerancia a la lactosa',
      'Alergia a frutos secos',
      'Alergia al marisco o pescado',
      'Alergia al huevo',
      'Vegetariano',
      'Vegano',
      'Embarazada'
    ])
    .showOtherOption(true)
    .setRequired(true);
  form.addParagraphTextItem().setTitle('Si has marcado alguna, cuéntanos quién y cualquier detalle importante')
    .setHelpText('Ej.: "María, alergia grave a los frutos secos".');
  form.addTextItem().setTitle('🎵 Una canción que no puede faltar en la fiesta');

  // ---------- Sección 3: mensaje (para todos) ----------
  var final = form.addPageBreakItem().setTitle('Para terminar');
  form.addParagraphTextItem().setTitle('¿Quieres dejarnos un mensaje?');

  asistencia.setChoices([
    asistencia.createChoice('¡Sí, allí estaré! 🎉', detalles),
    asistencia.createChoice('Lo siento, no podré asistir', final)
  ]);

  // Hoja de cálculo con las respuestas, en la misma carpeta de Drive
  var hoja = SpreadsheetApp.create('Boda Juan & Nerea · Respuestas');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, hoja.getId());

  Logger.log('Enlace para invitados: ' + form.shortenFormUrl(form.getPublishedUrl()));
  Logger.log('Editar formulario:     ' + form.getEditUrl());
  Logger.log('Hoja de respuestas:    ' + hoja.getUrl());
}

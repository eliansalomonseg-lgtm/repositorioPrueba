<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inscripción de Datos Escolar - Secretaría de Educación</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/select2-bootstrap-5-theme@1.3.0/dist/select2-bootstrap-5-theme.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css" rel="stylesheet">
    <link href="css/estilos.css" rel="stylesheet">
</head>
<body>

<div id="wrapper">

    <div class="header-institucional text-center">
        <img src="../img/logoSeg.png" alt="Logotipo Oficial" class="img-fluid" style="max-height: 110px; width: auto;">
    </div>

    <nav class="navbar navbar-seg shadow-sm">
        <div class="container-fluid justify-content-center">
            <span class="titulo-nav">Formulario Oficial: Registro de Escuelas y Recibos de Luz (CFE)</span>
        </div>
    </nav>

    <div class="form-container">
        
        <div class="text-center mb-4">
            <h2 class="titulo-principal-form">Ficha de Recopilación de Datos del Plantel</h2>
            <p class="text-muted" style="font-size: 1.15rem; max-width: 800px; margin: 0 auto;">
                Estimado(a) Director(a): Llene con cuidado cada apartado. Los campos con asterisco (*) son obligatorios.
            </p>
        </div>

        <div class="progress-container">
            <div class="step-indicator active" id="indicator-1">1. Escuela</div>
            <div class="step-indicator" id="indicator-2">2. Domicilio</div>
            <div class="step-indicator" id="indicator-3">3. Director</div>
            <div class="step-indicator" id="indicator-4">4. Población</div>
            <div class="step-indicator" id="indicator-5">5. Luz (CFE)</div>
        </div>

        <form action="../controllers/procesar.php" method="POST" enctype="multipart/form-data" id="registroForm" novalidate>
            
            <div class="form-step active" id="step-1">
                <div class="section-title">Paso 1: Información de la Escuela</div>
                <p class="instruccion-seccion">Escriba los datos oficiales de identificación de su centro de trabajo.</p>
                
                <div class="row g-4">
                    <div class="col-md-4">
                        <label class="form-label">Clave de la Escuela (CCT) *</label>
                        <input type="text" name="cct" class="form-control" placeholder="Ej. 12DPR0000A" required maxlength="10" minlength="10">
                    </div>
                    <div class="col-md-5">
                        <label class="form-label">Nombre Completo de la Escuela *</label>
                        <input type="text" name="nombre_escuela" class="form-control" placeholder="Ej. Escuela Primaria Federal Patria" required>
                    </div>
                    <div class="col-md-3">
                        <label class="form-label">Turno del Plantel *</label>
                        <select name="turno" class="form-select" required>
                            <option value="">-- Seleccione una opción --</option>
                            <option value="MATUTINO">MATUTINO</option>
                            <option value="VESPERTINO">VESPERTINO</option>
                            <option value="NOCTURNO">NOCTURNO</option>
                            <option value="DISCONTINUO">DISCONTINUO</option>
                            <option value="TIEMPO COMPLETO">TIEMPO COMPLETO</option>
                        </select>
                    </div>
                </div>
                <div class="step-actions">
                    <button type="button" class="btn-seg-siguiente" onclick="nextStep(1)">Siguiente Paso &#10140;</button>
                </div>
            </div>

            <div class="form-step" id="step-2">
                <div class="section-title">Paso 2: Domicilio Geográfico de la Escuela</div>
                <p class="instruccion-seccion">Indique el lugar exacto donde se ubica el inmueble escolar.</p>
                
                <div class="row g-4">
                    <div class="col-md-5">
                        <label class="form-label">Calle o Avenida *</label>
                        <input type="text" name="calle" class="form-control" placeholder="Ej. Av. Lázaro Cárdenas" required>
                    </div>
                    <div class="col-md-2">
                        <label class="form-label">Núm. Exterior *</label>
                        <input type="text" name="numero" class="form-control" placeholder="Ej. 140 o S/N" required>
                    </div>
                    <div class="col-md-5">
                        <label class="form-label">Colonia, Barrio o Fraccionamiento *</label>
                        <input type="text" name="colonia" class="form-control" placeholder="Ej. Centro" required>
                    </div>
                    <div class="col-md-3">
                        <label class="form-label">Código Postal *</label>
                        <input type="text" name="cp" class="form-control" placeholder="Ej. 39000 (5 dígitos)" required maxlength="5" inputmode="numeric" pattern="[0-9]*">
                    </div>
                    <div class="col-md-4">
                        <label class="form-label">Localidad, Poblado o Comunidad *</label>
                        <input type="text" name="localidad" class="form-control" placeholder="Ej. Chilpancingo" required>
                    </div>
                    <div class="col-md-5">
                        <label class="form-label">Municipio *</label>
                        <select name="municipio" class="form-select js-example-basic-single" id="municipioSelect" required>
                            <option value="">-- Seleccione un Municipio --</option>
                            <option value="ACAPULCO DE JUAREZ">Acapulco de Juárez</option>
                            <option value="ACATEPEC">Acatepec</option>
                            <option value="AHUACUOTZINGO">Ahuacuotzingo</option>
                            <option value="AJUCHITLAN DEL PROGRESO">Ajuchitlán del Progreso</option>
                            <option value="ALCOZAUCA DE GUERRERO">Alcozauca de Guerrero</option>
                            <option value="ALPOYECA">Alpoyeca</option>
                            <option value="APAXTLA">Apaxtla</option>
                            <option value="ARCELIA">Arcelia</option>
                            <option value="ATENANGO DEL RIO">Atenango del Río</option>
                            <option value="ATLAMAJALCINGO DEL MONTE">Atlamajalcingo del Monte</option>
                            <option value="ATLIXTAC">Atlixtac</option>
                            <option value="ATOYAC DE ALVAREZ">Atoyac de Álvarez</option>
                            <option value="AYUTLA DE LOS LIBRES">Ayutla de los Libres</option>
                            <option value="AZOYU">Azoyú</option>
                            <option value="BENITO JUAREZ">Benito Juárez</option>
                            <option value="BUENAVISTA DE CUELLAR">Buenavista de Cuéllar</option>
                            <option value="COAHUAYUTLA DE JOSE MARIA IZAZAGA">Coahuayutla de José María Izazaga</option>
                            <option value="COCHOAPA EL GRANDE">Cochoapa el Grande</option>
                            <option value="COCULA">Cocula</option>
                            <option value="COPALA">Copala</option>
                            <option value="COPALILLO">Copalillo</option>
                            <option value="COPANATOYAC">Copanatoyac</option>
                            <option value="COYUCA DE BENITEZ">Coyuca de Benítez</option>
                            <option value="COYUCA DE CATALAN">Coyuca de Catalán</option>
                            <option value="CUAJINICUILAPA">Cuajinicuilapa</option>
                            <option value="CUALAC">Cualác</option>
                            <option value="CUAUTEPEC">Cuautepec</option>
                            <option value="CUETZALA DEL PROGRESO">Cuetzala del Progreso</option>
                            <option value="CUTZAMALA DE PINZON">Cutzamala de Pinzón</option>
                            <option value="CHILAPA DE ALVAREZ">Chilapa de Álvarez</option>
                            <option value="CHILPANCINGO DE LOS BRAVO">Chilpancingo de los Bravo</option>
                            <option value="EDUARDO NERI">Eduardo Neri</option>
                            <option value="FLORENCIO VILLARREAL">Florencio Villarreal</option>
                            <option value="GENERAL CANUTO A. NERI">General Canuto A. Neri</option>
                            <option value="GENERAL HELIODORO CASTILLO">General Heliodoro Castillo</option>
                            <option value="HUAMUXTITLAN">Huamuxtitlán</option>
                            <option value="HUITZUCO DE LOS FIGUEROA">Huitzuco de los Figueroa</option>
                            <option value="IGUALA DE LA INDEPENDENCIA">Iguala de la Independencia</option>
                            <option value="IGUALAPA">Igualapa</option>
                            <option value="ILIATENCO">Iliatenco</option>
                            <option value="IXCATEOPAN DE CUAUHTEMOC">Ixcateopan de Cuauhtémoc</option>
                            <option value="JOSE JOAQUIN DE HERRERA">José Joaquín de Herrera</option>
                            <option value="JUAN R. ESCUDERO">Juan R. Escudero</option>
                            <option value="JUCHITAN">Juchitán</option>
                            <option value="LA UNION DE ISIDORO MONTES DE OCA">La Unión de Isidoro Montes de Oca</option>
                            <option value="LAS VIGAS">Las Vigas</option>
                            <option value="LEONARDO BRAVO">Leonardo Bravo</option>
                            <option value="MALINALTEPEC">Malinaltepec</option>
                            <option value="MARQUELIA">Marquelia</option>
                            <option value="MARTIR DE CUILAPAN">Mártir de Cuilapan</option>
                            <option value="METLATONOC">Metlatónoc</option>
                            <option value="MOCHITLAN">Mochitlán</option>
                            <option value="NUU SAVI">Ñuu Savi</option>
                            <option value="OLINALA">Olinalá</option>
                            <option value="OMETEPEC">Ometepec</option>
                            <option value="PEDRO ASCENCIO ALQUISIRAS">Pedro Ascencio Alquisiras</option>
                            <option value="PETATLAN">Petatlán</option>
                            <option value="PILCAYA">Pilcaya</option>
                            <option value="PUNGARABATO">Pungarabato</option>
                            <option value="QUECHULTENANGO">Quechultenango</option>
                            <option value="SAN LUIS ACATLAN">San Luis Acatlán</option>
                            <option value="SAN MARCOS">San Marcos</option>
                            <option value="SAN MIGUEL TOTOLAPAN">San Miguel Totolapan</option>
                            <option value="SAN NICOLAS">San Nicolás</option>
                            <option value="SANTA CRUZ DEL RINCON">Santa Cruz del Rincón</option>
                            <option value="TAXCO DE ALARCON">Taxco de Alarcón</option>
                            <option value="TECOANAPA">Tecoanapa</option>
                            <option value="TECPAN DE GALEANA">Técpan de Galeana</option>
                            <option value="TELOLOAPAN">Teloloapan</option>
                            <option value="TEPECOACUILCO DE TRUJANO">Tepecoacuilco de Trujano</option>
                            <option value="TETIPAC">Tetipac</option>
                            <option value="TIXTLA DE GUERRERO">Tixtla de Guerrero</option>
                            <option value="TLACOACHISTLAHUACA">Tlacoachistlahuaca</option>
                            <option value="TLACOAPA">Tlacoapa</option>
                            <option value="TLALCHAPA">Tlalchapa</option>
                            <option value="TLALIXTAQUILLA DE MALDONADO">Tlalixtaquilla de Maldonado</option>
                            <option value="TLAPA DE COMONFORT">Tlapa de Comonfort</option>
                            <option value="TLAPEHUALA">Tlapehuala</option>
                            <option value="XALPATLAHUAC">Xalpatláhuac</option>
                            <option value="XOCHIHUEHUETLAN">Xochihuehuetlán</option>
                            <option value="XOCHISTLAHUACA">Xochistlahuaca</option>
                            <option value="ZAPOTITLAN TABLAS">Zapotitlán Tablas</option>
                            <option value="ZIHUATANEJO DE AZUETA">Zihuatanejo de Azueta</option>
                            <option value="ZIRANDARO">Zirándaro</option>
                            <option value="ZITLALA">Zitlala</option>
                        </select>
                    </div>
                </div>
                <div class="step-actions d-flex justify-content-between">
                    <button type="button" class="btn-seg-anterior" onclick="prevStep(2)">&#8592; Regresar</button>
                    <button type="button" class="btn-seg-siguiente" onclick="nextStep(2)">Siguiente Paso &#10140;</button>
                </div>
            </div>

            <div class="form-step" id="step-3">
                <div class="section-title">Paso 3: Datos de Contacto del Director o Responsable</div>
                <p class="instruccion-seccion">Información de la persona a cargo del plantel educativo.</p>
                
                <div class="row g-4">
                    <div class="col-md-4">
                        <label class="form-label">Nombre Completo del Director(a) *</label>
                        <input type="text" name="nombre_director" class="form-control" placeholder="Ej. Juan Pérez García" required>
                    </div>
                    <div class="col-md-4">
                        <label class="form-label">Número de Teléfono Celular *</label>
                        <input type="tel" name="telefono_director" class="form-control" placeholder="Ej. 7471234567 (10 dígitos)" required maxlength="10" inputmode="numeric" pattern="[0-9]*">
                    </div>
                    <div class="col-md-4">
                        <label class="form-label">Tipo de Nombramiento Directivo *</label>
                        <select name="tipo_nombramiento" class="form-select" required>
                            <option value="">-- SELECCIONE UNA OPCIÓN --</option>
                            <option value="INTERINO">INTERINO (TEMPORAL)</option>
                            <option value="COMISION">COMISIÓN / ENCARGADO</option>
                            <option value="DEFINITIVO">DEFINITIVO / PLAZA DE BASE</option>
                        </select>
                    </div>
                </div>
                <div class="step-actions d-flex justify-content-between">
                    <button type="button" class="btn-seg-anterior" onclick="prevStep(3)">&#8592; Regresar</button>
                    <button type="button" class="btn-seg-siguiente" onclick="nextStep(3)">Siguiente Paso &#10140;</button>
                </div>
            </div>

            <div class="form-step" id="step-4">
                <div class="section-title">Paso 4: Cantidad de Alumnos, Maestros y Empleados</div>
                <p class="instruccion-seccion">Escriba el número total de personas que asisten actualmente al centro escolar.</p>
                
                <div class="row g-4">
                    <div class="col-md-3">
                        <label class="form-label">Alumnos (Niños) *</label>
                        <input type="number" name="matricula_ninos" class="form-control" min="0" placeholder="Ej. 120" required>
                    </div>
                    <div class="col-md-3">
                        <label class="form-label">Alumnas (Niñas) *</label>
                        <input type="number" name="matricula_ninas" class="form-control" min="0" placeholder="Ej. 115" required>
                    </div>
                    <div class="col-md-3">
                        <label class="form-label">Maestros (Docentes) *</label>
                        <input type="number" name="personal_docente" class="form-control" min="0" placeholder="Ej. 8" required>
                    </div>
                    <div class="col-md-3">
                        <label class="form-label">Apoyo y Oficina *</label>
                        <input type="number" name="personal_administrativo" class="form-control" min="0" placeholder="Ej. 3" required>
                    </div>
                </div>
                <div class="step-actions d-flex justify-content-between">
                    <button type="button" class="btn-seg-anterior" onclick="prevStep(4)">&#8592; Regresar</button>
                    <button type="button" class="btn-seg-siguiente" onclick="nextStep(4)">Siguiente Paso &#10140;</button>
                </div>
            </div>

            <div class="form-step" id="step-5">
                <div class="section-title">Paso 5: Información de la Luz Eléctrica (CFE)</div>
                <p class="instruccion-seccion">Ingrese los números RPU (Servicios de Luz) de la escuela. Puede registrar más de uno si es necesario.</p>
                
                <!-- Sección de Carga Rápida (Colapsada por defecto) -->
                <div id="bulk-paste-container" class="bulk-paste-box mb-4 d-none">
                    <h5 class="bulk-title">
                        <span class="bulk-icon">&#9889;</span> Carga Rápida Multiservicio (Pegar RPUs)
                    </h5>
                    <p class="bulk-help">Pegue uno o varios números RPU de 12 dígitos (separados por espacios, comas o saltos de línea):</p>
                    <textarea id="bulk-rpu-input" class="form-control mb-3" rows="3" placeholder="Ej. 012345678901, 987654321098, 111122223333" style="text-transform: none;"></textarea>
                    <div class="text-end">
                        <button type="button" class="btn btn-sm btn-secondary me-2" id="btn-cancel-bulk">Cancelar</button>
                        <button type="button" class="btn btn-sm btn-seg-guardar-min" id="btn-apply-bulk">Cargar Servicios</button>
                    </div>
                </div>

                <!-- Lista de RPUs Dinámica -->
                <div class="rpu-section-header d-flex justify-content-between align-items-center mb-3">
                    <span class="rpu-section-title">Servicios de Luz Registrados</span>
                    <div class="d-flex gap-2">
                        <button type="button" class="btn-seg-carga-masiva-toggle" id="btn-toggle-bulk">
                            &#9889; Ingreso Rápido
                        </button>
                        <button type="button" class="btn-seg-agregar-rpu" id="btn-add-rpu">
                            + Agregar Servicio
                        </button>
                    </div>
                </div>

                <div id="rpu-list-container" class="mb-4">
                    <!-- Fila Principal (Obligatoria) -->
                    <div class="rpu-row row g-3 mb-3 align-items-end" data-index="0">
                        <div class="col-md-5">
                            <label class="form-label">Número RPU (12 dígitos) *</label>
                            <input type="text" name="rpu[]" class="form-control rpu-input" placeholder="Ej. 012345678901 (12 dígitos)" required maxlength="12" minlength="12" inputmode="numeric" pattern="[0-9]*">
                        </div>
                        <div class="col-md-5">
                            <label class="form-label">Estatus del servicio del RPU *</label>
                            <select name="estatus_rpu[]" class="form-select" required>
                                <option value="">-- SELECCIONE --</option>
                                <option value="ACTIVO" selected>ACTIVO</option>
                                <option value="SUSPENDIDO">SUSPENDIDO</option>
                                <option value="SIN CONTRATO">SIN CONTRATO</option>
                                <option value="EN PROCESO">EN PROCESO</option>
                            </select>
                        </div>
                        <div class="col-md-2 text-end">
                            <button type="button" class="btn-seg-eliminar-rpu w-100" disabled title="El servicio principal no se puede eliminar">
                                Quitar
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Separador Sutil -->
                <hr class="my-4" style="border-top: 2px solid #dddddd;">

                <!-- Fotografía de la Fachada (Escuela en general) -->
                <div class="row g-4 align-items-center">
                    <div class="col-md-6">
                        <label class="form-label">Foto de la Fachada de la Escuela *</label>
                        <p class="text-muted" style="font-size: 0.9rem; margin-top: -5px; margin-bottom: 10px;">Suba una fotografía reciente de la entrada principal del plantel.</p>
                        <input type="file" name="foto_fachada" class="form-control" accept="image/*" required>
                    </div>
                    <div class="col-md-6">
                        <div class="preview-box w-100 d-flex flex-column align-items-center justify-content-center" style="min-height: 140px; margin-top: 0;">
                            <span id="preview-placeholder" class="text-muted" style="font-size: 0.95rem;">Vista previa de la fachada</span>
                            <img id="vista-previa-img" src="#" alt="Foto seleccionada" style="max-width: 100%; max-height: 120px; display: none; border-radius: 4px;">
                        </div>
                    </div>
                </div>

                <div class="step-actions d-flex justify-content-between mt-5">
                    <button type="button" class="btn-seg-anterior" onclick="prevStep(5)">&#8592; Regresar</button>
                    <button type="submit" class="btn-seg-guardar shadow-sm">&#10004; Revisar y Enviar Datos</button>
                </div>
            </div>

        </form>
    </div>

</div>

<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="js/wizard.js"></script>

<script>
    $(document).ready(function() {
        $('#municipioSelect').select2({
            theme: 'bootstrap-5',
            placeholder: 'Seleccione un Municipio',
            allowClear: true,
            width: '100%'
        });
    });
</script>
</body>
</html>
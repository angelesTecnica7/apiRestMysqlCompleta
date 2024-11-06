export const navbar = `
<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Tienda On-line</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Inicio</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="index.html">Productos</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="contacto.html">Contáctenos</a>
          </li>
        </ul>
        <div class="usuario">
          <div id="logueado" style="display: none;">
            <ul class="navbar-nav">
              <li class="navbar-nav dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                  aria-expanded="false">
                  Nbr-Usuario
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Cuenta</a></li>
                  <li><a class="dropdown-item" href="#">Pedidos</a></li>
                </ul>
              </li>
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#" onclick="logout()">Salir <i
                    class="bi bi-box-arrow-in-right"></i></a>
              </li>
            </ul>
          </div>
          <div id="no-logueado">
            <ul class="navbar-nav" >
              <li class="nav-item"><i class="bi bi-person-circle fs-4"></i></li>
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#" onclick="login()">Ingresar</a>
              </li>
            </ul>
    
          </div>
        </div>
      </div>
    </div>
  </nav>
`;

export const footer = `
 <footer class="text-center border-top p-3">
      <span class="my-3 mx-5 text-body-secondary"><b>7mo. 1ra. Programación - Grupo "A" - Técnica 7</b></span>
  </footer>
`;

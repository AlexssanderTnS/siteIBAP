import "./App.css";

const projetos = [
  ["CAPACITAÇÃO", "Oficinas para artesãos parceria Fenig-IBAP", "Apoio à formação, gestão e comercialização de produtos artesanais."],
  ["PARCERIA", "Parceria Fenig-IBAP fortalece o Programa Municipal de Artesanato", "Ações integradas para valorização do artesanato e geração de renda."],
  ["DESENVOLVIMENTO", "Oficinas para artesãos parceria Fenig-IBAP", "Consultorias e oficinas que promovem inovação e competitividade."],
  ["GESTÃO PÚBLICA", "Parceria Fenig-IBAP fortalece o Programa Municipal de Artesanato", "Assistência técnica especializada para gestão municipal."]
];

const servicos = [
  "Centros Integrados de Atendimento ao Cidadão",
  "Gestão Integrada para Resultados",
  "Desenvolvimento e Governança",
  "Gestão de Pessoas",
  "Gestão Social e Ambiental",
  "Tecnologia da Informação e Comunicação",
  "Processos Seletivos",
  "Mobilidade Urbana",
  "Comunicação",
  "Soluções personalizadas"
];

const cursos = [
  ["🚗", "CNH", "Formação completa para habilitação com qualidade e segurança."],
  ["📈", "Empreendedorismo", "Desenvolva habilidades para empreender e inovar no mercado."],
  ["💰", "Educação Financeira", "Aprenda a gerir suas finanças pessoais e alcançar objetivos."],
  ["🛡️", "Saúde e Segurança", "Cursos voltados para ambientes mais seguros e saudáveis."]
];

const logos = [
  "Prefeitura Rio", "ALERJ", "Espírito Santo", "Eletrobras", "INB", "DETRAN.RJ",
  "INEA", "CET-Rio", "IASES", "Rio de Janeiro", "Eletronuclear", "FUMASA",
  "Fiocruz", "Faça Fácil", "BR Transporte", "SENAC", "SEGER", "Rio Poupa Tempo",
  "PRODERJ", "Petrobras", "FURNAS", "CIO-RJ", "INC", "PRODEST"
];

function App() {
  return (
    <div>
      <header className="header">
        <div className="logo">
          <span className="logo-grid">▦</span>
          <div>
            <strong>IBAP<span>RJ</span></strong>
            <small>Instituto Brasileiro de Administração Pública</small>
          </div>
        </div>

        <nav>
          <a>Quem Somos</a>
          <a>Projetos</a>
          <a>Nossos Serviços</a>
          <a>Cursos</a>
          <a>Transparência</a>
          <a>Boletim IBAP-RJ</a>
        </nav>

        <button className="btn-dark">Fale Conosco</button>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1>
            Soluções integradas <br />
            para uma <span>administração pública</span> mais eficiente
          </h1>

          <p>
            Núcleos especializados que combinam pesquisa aplicada, conhecimento
            e inovação para desenvolver projetos de consultoria e assistência
            técnica que geram impacto real na gestão pública e na sociedade.
          </p>

          <div className="hero-buttons">
            <button className="btn-green">Conheça nossos projetos →</button>
            <button className="btn-outline">Nossos serviços</button>
          </div>
        </div>

        <div className="hero-image">
          <div className="icon blue">👥</div>
          <div className="icon green">🌿</div>
          <div className="icon yellow">📊</div>
          <div className="icon navy">🤝</div>
        </div>
      </section>

      <main>
        <section className="section">
          <div className="section-title">
            <h2>Projetos em destaque</h2>
            <a>Ver todos os projetos →</a>
          </div>

          <div className="cards projetos">
            {projetos.map((item, index) => (
              <article className="card" key={index}>
                <div className="card-img">
                  <span>{item[0]}</span>
                </div>
                <h3>{item[1]}</h3>
                <p>{item[2]}</p>
                <a>Saiba mais →</a>
              </article>
            ))}
          </div>
        </section>

        <section className="services-grid">
          <div className="services-box">
            <h2>Nossos serviços</h2>
            <div className="services-list">
              {servicos.map((servico, index) => (
                <div className="service-item" key={index}>
                  <span>◎</span>
                  <p>{servico}</p>
                </div>
              ))}
            </div>
            <button className="btn-dark">Ver todos os serviços</button>
          </div>

          <div className="photo-box"></div>

          <div className="mission-box">
            <h2>Nossa missão</h2>
            <p>
              Contribuir para o desenvolvimento de nossos clientes oferecendo
              serviços de qualidade, soluções inovadoras e resultados efetivos,
              trabalhando sempre com ética e responsabilidade socioambiental.
            </p>
            <strong>🌿 Certificação ISO</strong>
            <small>Compromisso com a qualidade e a sustentabilidade.</small>
          </div>
        </section>

        <section className="numbers">
          <h2>IBAP-RJ em números</h2>
          <div className="number-grid">
            <div><strong>5.000+</strong><span>projetos realizados</span></div>
            <div><strong>200+</strong><span>clientes atendidos</span></div>
            <div><strong>30+</strong><span>anos de experiência</span></div>
            <div><strong>Equipe</strong><span>colaboradores e especialistas</span></div>
          </div>
        </section>

        <section className="section">
          <h2 className="center">Nossos clientes</h2>
          <div className="logos">
            {logos.map((logo, index) => (
              <div className="logo-card" key={index}>{logo}</div>
            ))}
          </div>
          <div className="center">
            <button className="btn-outline-dark">Ver todos os clientes</button>
          </div>
        </section>

        <section className="section">
          <div className="section-title">
            <h2>Cursos em destaque</h2>
            <a>Ver todos os cursos →</a>
          </div>

          <div className="course-grid">
            {cursos.map((curso, index) => (
              <div className="course-card" key={index}>
                <div className="course-icon">{curso[0]}</div>
                <div>
                  <h3>{curso[1]}</h3>
                  <p>{curso[2]}</p>
                </div>
                <span>→</span>
              </div>
            ))}
          </div>
        </section>

        <section className="bottom-content">
          <div className="boletim">
            <h2>Boletim IBAP-RJ</h2>
            <p>Acompanhe nossos notícias, artigos e publicações.</p>
            <button className="btn-dark">Acessar boletim</button>
          </div>

          <div className="instagram">
            <h2>Nos siga no Instagram</h2>
            <div className="insta-grid">
              <div>Gestão pública que transforma realidades.</div>
              <div>Planejamento estratégico para grandes resultados.</div>
              <div>Inovação e tecnologia a serviço das pessoas.</div>
              <div>Parcerias que geram impacto.</div>
              <div>Conhecimento que capacita.</div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-grid">
          <div>
            <div className="footer-logo">IBAP<span>RJ</span></div>
            <p>Instituto Brasileiro de Administração Pública vinculado ao Estado do Rio de Janeiro.</p>
          </div>

          <div>
            <h4>Links rápidos</h4>
            <a>Quem Somos</a>
            <a>Projetos</a>
            <a>Nossos Serviços</a>
            <a>Cursos</a>
            <a>Transparência</a>
          </div>

          <div>
            <h4>Contato</h4>
            <p>Rua Buenos Aires, 68 / 31º - Rio de Janeiro - RJ</p>
            <p>(21) 3860-9100</p>
            <p>denuncias@ibap-rj.org.br</p>
          </div>

          <div>
            <h4>Onde estamos</h4>
            <div className="map">📍 Mapa</div>
          </div>
        </div>

        <div className="copy">© 2024 IBAP-RJ - Todos os direitos reservados.</div>
      </footer>
    </div>
  );
}

export default App;
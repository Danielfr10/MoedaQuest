import React, { useEffect, useRef, useState } from "react";

function LeafMark() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M12 52C12 29 28 12 52 12C52 36 36 52 12 52Z" />
      <path d="M12 52L40 24" />
    </svg>
  );
}

function BrandBadge() {
  return (
    <>
      <div className="badge" aria-hidden="true">
        <LeafMark />
      </div>
      <p className="brand">MOEDAQUEST</p>
    </>
  );
}

export default function App() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [age, setAge] = useState("");
  const [ageError, setAgeError] = useState("");
  const [showAgeScreen, setShowAgeScreen] = useState(false);
  const nameInput = useRef(null);
  const ageInput = useRef(null);
  const focusNameOnReturn = useRef(false);

  useEffect(() => {
    if (showAgeScreen) {
      ageInput.current?.focus();
    } else if (focusNameOnReturn.current) {
      nameInput.current?.focus();
      focusNameOnReturn.current = false;
    }
  }, [showAgeScreen]);

  function handleNameSubmit(event) {
    event.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName) {
      setNameError("Escreva seu nome para continuar.");
      nameInput.current?.focus();
      return;
    }

    setNameError("");
    setShowAgeScreen(true);
  }

  function handleBack() {
    focusNameOnReturn.current = true;
    setShowAgeScreen(false);
  }

  function getAgeError(value) {
    if (!value) {
      return "Digite sua idade para continuar.";
    }

    const parsedAge = Number(value);
    if (!/^\d+$/.test(value) || parsedAge < 1 || parsedAge > 120) {
      return "Digite uma idade válida entre 1 e 120 anos.";
    }

    return "";
  }

  function handleAgeChange(event) {
    const value = event.target.value;

    if (!/^\d*$/.test(value)) {
      setAgeError("Digite apenas números.");
      return;
    }

    setAge(value);
    setAgeError(value ? getAgeError(value) : "");
  }

  function handleAgeSubmit(event) {
    event.preventDefault();
    if (ageError) {
      return;
    }

    setAgeError(getAgeError(age));
  }

  return (
    <main className="page">
      <section className="screen" id="welcome" hidden={showAgeScreen}>
        <BrandBadge />
        <h1>Aprender sobre dinheiro pode ser uma aventura!</h1>
        <p className="lead">
          Vamos começar com o seu nome. Assim, sua trilha fica só sua.
        </p>

        <form className="field" onSubmit={handleNameSubmit} noValidate>
          <label htmlFor="name">Como você quer ser chamado?</label>
          <input
            ref={nameInput}
            id="name"
            name="name"
            type="text"
            placeholder="Digite seu nome"
            autoComplete="given-name"
            maxLength={30}
            aria-describedby="nameError"
            aria-invalid={nameError ? "true" : undefined}
            onChange={(event) => {
              setName(event.target.value);
              setNameError("");
            }}
            value={name}
          />
          <p className="error" id="nameError" role="alert" aria-live="polite">
            {nameError}
          </p>
          <button className="btn" type="submit">
            Começar minha aventura
          </button>
        </form>

        <p className="help">
          Você pode pedir ajuda a um adulto a qualquer momento.
        </p>
      </section>

      <section className="screen" id="age" hidden={!showAgeScreen}>
        <button
          className="back-button"
          type="button"
          aria-label="Voltar para a tela do nome"
          onClick={handleBack}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <BrandBadge />
        <h1>Qual é a sua idade?</h1>
        <p className="lead">
          Conte sua idade para continuarmos a preparar sua aventura.
        </p>

        <form className="field" onSubmit={handleAgeSubmit} noValidate>
          <label htmlFor="ageInput">Quantos anos você tem?</label>
          <input
            ref={ageInput}
            id="ageInput"
            name="age"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Digite sua idade"
            maxLength={3}
            aria-describedby="ageError"
            aria-invalid={ageError ? "true" : undefined}
            onChange={handleAgeChange}
            value={age}
          />
          <p className="error" id="ageError" role="alert" aria-live="polite">
            {ageError}
          </p>
          <button className="btn" type="submit">
            Continuar
          </button>
        </form>

        <p className="help">
          Você pode pedir ajuda a um adulto a qualquer momento.
        </p>
      </section>
    </main>
  );
}

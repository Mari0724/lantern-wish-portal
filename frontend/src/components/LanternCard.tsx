import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import liyueNightBg from "@/assets/liyue-night-bg.jpg";
import lanternIcon from "@/assets/lantern-icon.jpg";
import imagen1 from "../assets/imagen1.jpg";
import imagen2 from "@/assets/imagen2.jpg";
import imagen3 from "@/assets/imagen3.jpg";
import imagen4 from "@/assets/imagen4.jpg";
import imagen5 from "@/assets/imagen5.jpg";


interface LanternCardProps {
  userEmail?: string;
}

const LanternCard: React.FC<LanternCardProps> = ({ userEmail = "" }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [email, setEmail] = useState(userEmail);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleUnlock = () => {
    if (email.trim() && name.trim()) {
      fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: email
        })
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al enviar el deseo");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Usuario creado:", data);
          // Aquí hago el GET con el id que devuelve
          return fetch(`http://localhost:3000/users/${data.id}`);
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al obtener el usuario");
          }
          return response.json();
        })
        .then((userData) => {
          setUserName(userData.name); // Guardo el nombre traído desde la DB
          setIsUnlocked(true);
        })
        .catch((error) => {
          console.error("Error en la petición:", error);
          alert("Hubo un error al enviar tu deseo. Intenta de nuevo.");
        });
    }
  };

  const defaultMessage = `Bajo el manto estrellado de Liyue, donde las linternas danzan con los vientos ancestrales, querido viajero, te invito a unirte al Rito de las Linternas.

En esta noche mágica, cuando los deseos ascienden hacia los cielos como mariposas doradas, permítete soñar sin límites. Que cada linterna que liberes lleve consigo tus anhelos más profundos, atravesando las nubes hacia los Siete Archones.

Como dice la tradición: "Mil linternas, mil deseos, una sola esperanza que nos une a todos". Tu deseo, por pequeño que parezca, es una chispa de luz en la oscuridad, una promesa de que los sueños pueden hacerse realidad.

¿Cuál es tu deseo para este nuevo año? Déjalo volar con las linternas hacia el infinito.`;

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-gradient-night flex items-center justify-center p-4 relative overflow-hidden">
        {/* Floating lanterns animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float-lantern opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${4 + Math.random() * 2}s`
              }}
            >
              <div className="w-8 h-10 bg-gradient-lantern rounded-lg shadow-glow"></div>
            </div>
          ))}
        </div>

        <Card className="w-full max-w-md bg-card/80 backdrop-blur-lg border-border/50 shadow-mystical animate-fade-in">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <img
                src={lanternIcon}
                alt="Golden Lantern"
                className="w-24 h-24 mx-auto mb-4 animate-glow-pulse rounded-lg"
              />
              <h1 className="text-3xl font-bold text-lantern-gold mb-2">
                Una linterna, un deseo
              </h1>
              <p className="text-muted-foreground">
                Rito de las Linternas • Genshin Impact
              </p>
            </div>


            <div>
              <Label htmlFor="name" className="text-foreground">Ingresa tu nombre</Label>
              <Input
                id="name"
                type="text"
                placeholder="Ingresa tu name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-input/50 border-border focus:ring-lantern-gold"
              />
            </div>


            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-foreground">Tu correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-input/50 border-border focus:ring-lantern-gold"
                />
              </div>


              <div>
                <Label htmlFor="password" className="text-foreground">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-input/50 border-border focus:ring-lantern-gold"
                />
              </div>


              <Button
                onClick={handleUnlock}
                disabled={!email.trim() || !name.trim()}
                className="w-full bg-gradient-lantern hover:bg-gradient-magic text-primary-foreground shadow-lantern transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
              >
                ✨ Ver mi linterna ✨
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: `url(${liyueNightBg})` }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-liyue-deep/70 via-transparent to-liyue-night/80"></div>

      {/* Floating sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            <div className="w-2 h-2 bg-lantern-glow rounded-full shadow-glow"></div>
          </div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 animate-slide-up">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-lantern-gold mb-4 animate-glow-pulse">
              Una linterna, un deseo
            </h1>
            <p className="text-xl text-lantern-amber">
              Rito de las Linternas
            </p>
          </div>

          {/* Main content card */}
          <Card className="bg-card/90 backdrop-blur-lg border-border/50 shadow-mystical mb-8">
            <CardContent className="p-8">
              {/* Default message display */}
              <div className="mb-8 p-6 bg-gradient-glow rounded-lg border border-lantern-gold/20">
                <h3 className="text-xl font-semibold text-lantern-gold mb-4">
                  Para {userName || "Viajero Anónimo"}
                </h3>

                <div className="text-foreground leading-relaxed whitespace-pre-line text-justify">
                  {defaultMessage}
                </div>
              </div>

              {/* Floating memories gallery */}
              <div className="mb-8 relative min-h-80">
                <h3 className="text-xl font-semibold text-lantern-gold mb-6">
                  Recuerdos del Rito
                </h3>
                <div className="relative">
                  {[...Array(5)].map((_, i) => (
                    <Dialog key={i}>
                      <DialogTrigger asChild>
                        <div
                          className="absolute overflow-hidden rounded-lg border border-lantern-gold/40 cursor-pointer hover:border-lantern-gold/80 transition-all duration-300 hover:scale-110 animate-float-lantern shadow-md"
                          style={{
                            width: i === 0 ? '120px' : i === 1 ? '100px' : '80px',
                            height: i === 0 ? '120px' : i === 1 ? '100px' : '80px',
                            left: i === 0 ? '10%' : i === 1 ? '65%' : i === 2 ? '30%' : i === 3 ? '80%' : '45%',
                            top: i === 0 ? '20px' : i === 1 ? '40px' : i === 2 ? '130px' : i === 3 ? '120px' : '200px',
                            animationDelay: `${i * 0.8}s`,
                            animationDuration: `${4 + i * 0.5}s`
                          }}
                        >
                          <img
                            src={[imagen1, imagen2, imagen3, imagen4, imagen5][i]}
                            alt={`Miniatura Memoria ${i + 1}`}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </DialogTrigger>

                      <DialogContent className="max-w-3xl bg-card/95 backdrop-blur-lg border-lantern-gold/30">
                        <div className="p-4">
                          <div className="aspect-square bg-gradient-glow rounded-lg border border-lantern-gold/20 flex items-center justify-center mb-4 overflow-hidden">
                            <img
                              src={
                                [imagen1, imagen2, imagen3, imagen4, imagen5][i]
                              }
                              alt={`Recuerdo ${i + 1}`}
                              className="object-cover w-full h-full rounded-lg"
                            />
                          </div>
                          <h3 className="text-center text-2xl font-bold text-lantern-gold mb-2">Memoria {i + 1}</h3>
                        </div>
                      </DialogContent>

                    </Dialog>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-6 text-center">
                  Toca cada linterna para ver tus recuerdos especiales del evento
                </p>
              </div>

              {/* YouTube video embed */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-lantern-gold mb-4">
                  Rito de las Linternas - Video Oficial
                </h3>
                <div className="aspect-video bg-liyue-night rounded-lg overflow-hidden shadow-mystical">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/29p4X_W1d04"
                    title="Genshin Impact - Rito de las Linternas"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer with magical elements */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 text-lantern-amber">
              <span>✨</span>
              <span>Que tu deseo se eleve como las linternas hacia los cielos</span>
              <span>✨</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanternCard;
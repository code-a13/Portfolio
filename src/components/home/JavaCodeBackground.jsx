import React, { useEffect, useRef } from "react";

export const JavaCodeBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const javaSnippets = [
      "public static void main(String[] args) {",
      "System.out.println(\"System Online\");",
      "ExecutorService executor = Executors.newFixedThreadPool(10);",
      "Stream<String> stream = data.stream().filter(Objects::nonNull);",
      "CompletableFuture.supplyAsync(() -> processData());",
      "@RestController @RequestMapping(\"/api\")",
      "public class SystemController {",
      "List<Thread> activeThreads = new ArrayList<>();",
      "HashMap<String, Object> cacheMap = new HashMap<>();",
      "Optional<User> user = repository.findById(userId);",
      "Thread.currentThread().interrupt();",
      "try { engine.start(); } catch (EngineException e) { log.error(e); }",
      "private static final Logger log = LoggerFactory.getLogger(App.class);"
    ];

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);
    const columnSnippets = Array(columns).fill("");

    const draw = () => {
      // Pure Black fade for the trailing effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        if (drops[i] === 1 || Math.random() > 0.99) {
           columnSnippets[i] = javaSnippets[Math.floor(Math.random() * javaSnippets.length)];
        }
        const text = columnSnippets[i];
        
        // MONOCHROME LOGIC: 20% chance for Bright White, 80% chance for Dim Gray
        ctx.fillStyle = Math.random() > 0.8 ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.15)"; 
        ctx.fillText(text, i * fontSize * 16, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        // Very slow falling speed for elegance
        drops[i] += 0.4; 
      }
    };

    const interval = setInterval(draw, 70); 
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      // Opacity adjusted so it acts as a subtle background, not the main focus
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-20 mix-blend-screen"
    />
  );
};
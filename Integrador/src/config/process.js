import { Command } from 'commander';


const program = new Command();

program
    .option("-p <port>", "puerto del servidor", 8080, 8081)
    .option("--mode <mode>", "Modo de trabajo", "DESARROLLO");

program.parse();

console.log("Options: ", program.opts());
console.log("Remaining arguments: ", program.args);

export default program;
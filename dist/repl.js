export function cleanInput(input) {
    return input.toLowerCase().trim().split(/\s+/);
}
export function startREPL(state) {
    state.readline.prompt();
    state.readline.on('line', async (input) => {
        const lineInput = cleanInput(input);
        if (lineInput.length === 0) {
            state.readline.prompt();
            return;
        }
        const command = lineInput[0];
        const args = lineInput.slice(1);
        const cmd = state.commands[command];
        if (!cmd) {
            console.log("Unknown command");
            state.readline.prompt();
            return;
        }
        try {
            await cmd.callback(state, ...args); // <- await the async command
        }
        catch (e) {
            console.log(e.message);
        }
        state.readline.prompt(); // prompt AFTER the command finishes
    });
}

const Consoler = require('../consoler.js');
console.clear()

const consoler1 = new Consoler({
  prefix: '[httpServer]', // adds prefix string to output
  // levels: { error: false }, // disables "error" log level * consoler.error will be a noop function
  // time: 'iso', // time format is an ISO string
});

const consoler2 = new Consoler({
  levels: { log: true }, // enables "log" log level only * the other log levels will be a noop function
  time: 'iso', // disables time output
  timeColor: 0,
  // colors: false, // disable ANSI color styles
});

const consoler3 = new Consoler({
  time: false, // disables time output
  
});

console.log('- Consoler1:');
consoler1.log(`Request:`, { url: '/' });
consoler1.info(`Server has been started`, { port: 3000 });
consoler1.debug(`User`, { id: 1234, name: 'Max' });
consoler1.error(`Failed to connect to database`, { port: 5432 });

console.log('\n- Consoler2:');
consoler2.log(`Request:`, { url: '/' });
consoler2.info(`Server has been started`, { port: 3000 });
consoler2.debug(`User`, { id: 1234, name: 'Max' });
consoler2.error(`Failed to connect to database`, { port: 5432 });

console.log('\n- Consoler3:');
consoler3.log(`Request:`, { url: '/' });
consoler3.info(`Server has been started`, { port: 3000 });
consoler3.debug(`User`, { id: 1234, name: 'Max' });
consoler3.error(`Failed to connect to database`, { port: 5432 });


async function processProgressExample() {
  let spinner = Consoler.spinner({
    postfix: "Downloading resources",    
  })
  
  let progressBar = Consoler.progress({
    total: 1000,
    prefix: `Downloading resources`,    
  })
  
  await new Promise((resolve) => {
    let i = 0
  
    let int = setInterval(() => {
      
      i += 10
      progressBar.update(i, { postfix: `/ ${i} items}` })
  
      if (i >= 1000) {
        clearInterval(int)
        progressBar.ok("Downloading resources completed", true)
        resolve(true)
      }
    }, 200)    
  })

  await new Promise((resolve) => {
    let i = 0
  
    spinner.animate()
    
    let int = setInterval(() => {
      
      i += 10
      spinner.set({ postfix: `Compile resources / ${i} items` })
      if (i >= 100) {
        clearInterval(int)
        spinner.fail("Compiling resources completed", true)
        resolve(true)
      }
    }, 200)    
  })

}

processProgressExample()
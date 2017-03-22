/*
 Train neural network to check if number is greater than 50 or not.
 */

(() => {

    const synaptic = require('synaptic');
    const colors = require('colors');

    let Trainer = synaptic.Trainer;
    let Architect = synaptic.Architect;

    // Create Perceptron Neural Network and trainer
    let network = new Architect.Perceptron(1, 10, 10, 1);
    let trainer = new Trainer(network);

    // Function to return a random number between
    const random = (low, high) => (Math.random() * (high - low) + low);

    // Data to use in train
    let training_set = [];
    // Data to use for make tests after train
    let test_set = [];

    // Create train data set
    for(let i = 0; i < 1000; i++) {

        const input = parseInt(random(0, 99)); // -> random number to test
        const output = input >= 50 ? 1 : 0; // -> expected result

        // Normalize input between 0 and 1 values.
        const normalized_input = input / 100;

        test_set.push(normalized_input);

        training_set.push({
            input: [normalized_input],
            output: [output]
        });

    }

    // Training
    trainer.train(
        training_set,
        {
            rate: .1,
            iterations: 1000000,
            error: .001,
            shuffle: true,
            log: 100,
            cost: Trainer.cost.CROSS_ENTROPY
        }
    );

    // Test neural network, check numbers is less or greater than 50.
    test_set.map((value)=>{

        const test_result = parseInt(network.activate([value]) * 100);
        const log = `Number ${parseInt(value*100)} has ${test_result}% chance to be greater than 50`;

        test_result > 90 ?
            console.log(log.green) :
            console.log(log.red);

    });

})();
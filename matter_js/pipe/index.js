var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Constraint = Matter.Constraint,
    Body = Matter.Body,
    Events = Matter.Events,
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Bodies = Matter.Bodies,
    Svg = Matter.Svg,
    Vertices = Matter.Vertices,
    Constraint = Matter.Constraint;

// create engine
var engine = Engine.create({
    positionIterations: 10,
    velocityIterations: 10,
    constraintIterations: 5
}),
    world = engine.world;
let window_w = innerWidth
let window_h = innerHeight
if (innerWidth < 1700) {
    window_w = 1700
}
if (innerHeight < 900) {
    window_h = 900
}

// create renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: window_w,
        height: window_h,
        // wireframes: false,
        showAngleIndicator: true
    }
});

Render.run(render);
Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: window_w, y: window_h }
});
// create runner
var runner = Runner.create();
Runner.run(runner, engine);
var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });
render.mouse = mouse;

Composite.add(world, mouseConstraint);
// engine.world.gravity.y = 0;
// add bodies
let bottom = Bodies.rectangle(window_w / 2, window_h * 0.95, window_w, 50.5, { isStatic: true, render: { fillStyle: '#060a19' } })
// 上
Composite.add(world, [
    //下
    bottom,
    Bodies.rectangle(window_w / 2, 0, window_w, 50.5, { isStatic: true, render: { fillStyle: '#060a19' } }),
    // 右
    Bodies.rectangle(window_w, window_h / 2, 50.5, window_h, { isStatic: true, render: { fillStyle: '#060a19' } }),
    //左
    Bodies.rectangle(0, window_h / 2, 50.5, window_h, { isStatic: true, render: { fillStyle: '#060a19' } })
]);
let run_speed = -0.05
function cy_ative(x, y, size, speed, siten, len) {
    let thick = 8
    let round_y = y + len * 0.8 + size * 0.6

    let round = Bodies.circle(x, round_y, size * 0.5, {
        render: {
            fillStyle: '#dd4444',
            strokeStyle: '#222222',
            lineWidth: 3,
            // isStatic: true
        }
    })
    Body.rotate(round, Math.PI * 0.5)
    let cube = Bodies.trapezoid(x, y, size * 2, size, 0.4, {
        render: {
            fillStyle: '#4444dd',
            strokeStyle: '#222222',
            lineWidth: 3,
            // isStatic: true
        }
    })

    cube.friction = 0
    Body.rotate(cube, Math.PI * 0.5);

    Composite.add(world, round)
    Composite.add(world, cube)
    let preten = -size * 0.5 * 0.8
    const cube_constraint = Constraint.create({
        pointA: { x: preten * Math.sin(siten), y: preten * Math.cos(siten) }, // 中心から少しずらす
        bodyA: round,
        pointB: { x: 0, y: size * 0.6 },
        bodyB: cube,
        length: len,
    })
    Composite.add(world, cube_constraint)

    let round_center = Bodies.circle(x, round_y, 0, { isStatic: true })
    Composite.add(world, round_center)
    const round_constraint = Constraint.create({
        pointA: { x: 0, y: 0 }, // 中心から少しずらす
        bodyA: round,
        pointB: { x: 0, y: 0 },
        bodyB: round_center,
        length: 0,
    })
    Composite.add(world, round_constraint)

    let left = Bodies.rectangle(x - (size + thick) / 2, y, thick, size * 2.5, { isStatic: true, render: { fillStyle: '#060a19' } })
    let right = Bodies.rectangle(x + (size + thick) / 2, y, thick, size * 2.5, { isStatic: true, render: { fillStyle: '#060a19' } })
    left.friction = 0
    // right.friction=0
    Composite.add(world, left)
    Composite.add(world, right)
    setInterval(() => {
        Body.setAngularVelocity(round, speed)
    }, 1)

}
function gear(local_x, local_y, touch, max_range, min_range) {
    let path = []
    // let runtime = touch^2
    let runtime = 100

    for (let i = 0; i < runtime; i++) {
        let angle = Math.PI * 2 / 100 * i
        let len
        if (Math.floor(i / ((runtime / touch)) * 2) % 2 == 0) {
            len = max_range
        } else {
            len = min_range
        }
        console.log(len)
        let x = len * Math.cos(angle)
        let y = len * Math.sin(angle)
        if (i == runtime - 1) {
            path += x.toString() + " " + y.toString()

        } else {
            path += x.toString() + " " + y.toString() + " "

        }
    }
    // console.log(path)

    var pretzel = Matter.Vertices.fromPath(path);
    // console.log(pretzel)
    let ploy = Bodies.fromVertices(local_x, local_y, pretzel)
    // setInterval(() => {
    //     Body.setAngularVelocity(ploy,- 0.5)
    // }, 1)
    return ploy
}
// let poly = gear(100, 100, 10, 20, 1)
// Composite.add(world, poly)
function state_round(x, y) {
    let wheel = Bodies.circle(x, y, 35, {
        render: {
            fillStyle: '#dd4444',
            strokeStyle: '#222222',
            lineWidth: 3,
            density: 3
        }
        // isStatic: true
    })
    // let wheel = Bodies.rectangle(x, y, 70,70, {
    //     render: {
    //         fillStyle: '#dd4444',
    //         strokeStyle: '#222222',
    //         lineWidth: 3,
    //         density: 3
    //     }
    //     // isStatic: true
    // })
    Composite.add(world, wheel)

    let round = Bodies.circle(x, y, 0, { isStatic: true })
    Composite.add(world, round)

    const round_constraint = Constraint.create({
        pointA: { x: 0, y: 0 }, // 中心から少しずらす
        bodyA: wheel,
        pointB: { x: 0, y: 0 },
        bodyB: round,
        length: 0
    })
    Composite.add(world, round_constraint)
    setInterval(() => {
        Body.setAngularVelocity(wheel, run_speed)
    }, 1)
    wheel.friction = 1000

}
function init() {
    for (let i = 0; i < 12; i++) {
        let size = 50

        // cy_ative(100 + i * (size + 20), 500 - i * 10, size, -(i + 5) / 70, 100)
        cy_ative(50 + i * (size + 8), 650, size, -0.1, (i % 2) * Math.PI, 150)

    }
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 6; j++) {
            let start
            let block = 50
            if (j % 2 == 0) {
                start = block / 2
            } else {
                start = block
            }

            let stack = Bodies.circle(start + (i % 10 + 1) * block, 200 + (j % 10 + 1) * block, 7, {
                render: {
                    fillStyle: '#dd4444',
                    strokeStyle: '#222222',
                    lineWidth: 3
                },
                isStatic: true
            })
            stack.friction = 0
            Composite.add(world, stack)
            let ball = Bodies.circle(start + (i % 10 + 1) * block, 180 + (j % 10 + 1) * block, 10, {
                render: {
                    fillStyle: '#dd4444',
                    strokeStyle: '#222222',
                    lineWidth: 3,
                    density: 0.0000000000000000000000000000000000001
                },
                // isStatic: true
            })
            ball.friction = 0.00001
            Events.on(engine, 'beforeUpdate', function (event) {
            })
            Composite.add(world, ball)
        }
    }

    var loadSvg = function (url) {
        return fetch(url)
            .then(function (response) { return response.text(); })
            .then(function (raw) { return (new window.DOMParser()).parseFromString(raw, 'image/svg+xml'); });
    };

    // "./rehuck.svg"

    loadSvg("../svg/thiner.svg").then(function (root) {
        var select = function (root, selector) {
            return Array.prototype.slice.call(root.querySelectorAll(selector));
        };
        let color = "#00ff00"
        console.log(root)
        let path = select(root, 'path')[0]
        console.log(path)
        // for (let i = 0; i < 7; i++) {

        //     state_round(620 + i * 50, 120 + i * 100)

        // }
        state_round(900, 160)

        setTimeout(() => {
            state_round(900, 600)
            run_speed = -0.08
            let pipe = Bodies.rectangle(680, 270, 270, 10, { isStatic: true, render: { fillStyle: '#060a19' } })
            Body.rotate(pipe, -Math.PI / 30)
            pipe.friction = 0
            Composite.add(world, pipe)

        }, 10000);
        let left = Bodies.rectangle(750, 120 + 100 * 7, 10, 150, { isStatic: true, render: { fillStyle: '#060a19' } })
        // Composite.add(world, left)
        let right = Bodies.rectangle(700 + 50 * 8, 120 + 100 * 7, 10, 500, { isStatic: true, render: { fillStyle: '#060a19' } })
        Composite.add(world, right)
        let center = Bodies.rectangle(800, 120 + 100 * 7, 10, 300, { isStatic: true, render: { fillStyle: '#060a19' } })
        Body.rotate(center, -Math.PI / 4)
        Composite.add(world, center)
        let bottom = Bodies.rectangle(900, 120 + 600, 10, 400, { isStatic: true, render: { fillStyle: '#060a19' } })
        Body.rotate(bottom, -Math.PI / 2)
        Composite.add(world, bottom)

        var boxes = Composites.stack(450, 100, 19, 1, 10, 1, function (x, y) {
            let block = Bodies.fromVertices(
                x, y, Matter.Svg.pathToVertices(path), { density: 0.001 }, true
            );
            Body.scale(block, 0.13, 0.13)
            Body.rotate(block, -Math.PI)
            block.friction = 1000
            return block
        })

        var chain = Composites.chain(boxes, 0.3, 0.13, -0.5, 0.13, { stiffness: 0.9 });
        console.log(chain)
        const chain_constraint = Constraint.create({
            pointA: { x: -25, y: 10 }, // 中心から少しずらす
            bodyA: chain.bodies[0],
            pointB: { x: 15, y: 10 },
            bodyB: chain.bodies[chain.bodies.length - 1],
            length: 20,
            stiffness: 0.3
        })
        setTimeout(function () {
            Composite.add(world, chain_constraint)


        }, 3000)

        Composite.add(world, chain)

    });
    
    // const right_constraint = Constraint.create({
    //     pointA: { x: 805+gap, y: 0 }, // 中心から少しずらす
    //     bodyA: bottom,
    //     pointB: { x: gap, y: 0 },
    //     bodyB: peter,
    //     length: 10,
    //     stiffness: 0.0003
    // })
    // Composite.add(world, right_constraint)    
   
    // setInterval(() => {
    //     Body.setVelocity(peter, { x: 0, y: -(25) })
    // }, 3000);
    // Composite.add(world, peter)
    let base = Bodies.trapezoid(1340, 800, 40, 100, 2, {
        render: {
            fillStyle: '#4444dd',
            strokeStyle: '#222222',
            lineWidth: 3,
        },
        density:1000000000000000000000000000000000000000000000

    })


    let round = Bodies.circle(1195, 800, 0, { isStatic: true })
    Composite.add(world, round)

    const base_constraint = Constraint.create({
        pointA: { x: 0, y: 20 }, // 中心から少しずらす
        bodyA: base,
        pointB: { x: 0, y: 0 },
        bodyB: round,
        length: 0
    })
    setInterval(() => {
        Body.setAngularVelocity(base, -0.1)
        setTimeout(() => {
            Body.setAngularVelocity(base, 0.11)
            
        }, 500);
    }, 1000)
    Composite.add(world,base_constraint)
    Body.rotate(base, -Math.PI / 2)
    Composite.add(world, base)
}

init()
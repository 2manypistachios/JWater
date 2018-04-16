import * as React from 'react'
import * as ReactDOM from "react-dom";
import Link from 'gatsby-link';
import paper from '../../node_modules/paper/dist/paper-core.js';
import Script from 'react-load-script';
import Helmet from 'react-helmet';

/*       
paper.install(window);

            paper.setup('paperCanvas');

            var amount = 20;
            var height = 60;

        
            var path = new Path({
                // 80% black:
                strokeColor: [0.8],
                strokeWidth: 30,
                strokeCap: 'square'
            });
            
            console.log(new Point(20,20) * view.size);
            //path.add(new Point(1, 1) * view.size);

            for (var i = 0; i <= amount; i++) {
                path.add(new Point(i / amount*1500, 60));
            }

            path.selected = false;
*/
/*
paper.setup('paperCanvas');
        var values = {
            friction: 0.8,
            timeStep: 0.01,
            amount: 15,
            mass: 2,
            count: 0
        };
        values.invMass = 1 / values.mass;
        
        var path, springs;
        
        var size = view.size.multiply([1.2, 1]);
        
        var checkSegments = function(a,b) {
            if (!a.y) {
                console.log("ERROR: A.Y NOT FOUND: ",a.y)
            } else if (!a.x) {
                console.log("ERROR: A.X NOT FOUND: ",a.x)
            } else if (!b.y) {
                console.log("ERROR: B.Y NOT FOUND: ",b.y);
            } else if (!b.x) {
                console.log("ERROR: B.X NOT FOUND: ",b.x);
            }
        }

        var Spring = function(a, b, strength, restLength) {
            checkSegments(a,b);
            this.a = a;
            this.b = b;
            this.restLength = restLength || 80;
            this.strength = strength ? strength : 0.55;
            this.mamb = values.invMass * values.invMass;
        };
        
        Spring.prototype.update = function() {
            var delta = this.b.subtract(this.a);
            //console.log(delta);
            var dist = delta.length;
            var normDistStrength = (dist - this.restLength) /
                    (dist * this.mamb) * this.strength;
            delta.y *= normDistStrength * values.invMass * 0.2;
            if (!this.a.fixed)
                this.a.y += delta.y;
            if (!this.b.fixed)
                this.b.y -= delta.y;
        };
        
        
        function createPath(strength) {
            var path = new Path({
                fillColor: 'black'
            });
            springs = [];
            for (var i = 0; i <= values.amount; i++) {
                var segment = path.add(new Point(i / values.amount, 0.5).multiply(size));
                var point = segment.point;
                if (i == 0 || i == values.amount)
                    point.y += size.height;
                point.px = point.x;
                point.py = point.y;
                // The first two and last two points are fixed:
                point.fixed = i < 2 || i > values.amount - 2;
                if (i > 0) {
                    var spring = new Spring(segment.previous.point, point, strength);
                    springs.push(spring);
                }
            }
            path.position.x -= size.width / 4;
            return path;
        }
        if (path)
            path.remove();
        size = view.bounds.size.multiply([2, 1]);
        path = createPath(0.1);

        function onResize() {
            if (path)
                path.remove();
            size = view.bounds.size.multiply([2, 1]);
            path = createPath(0.1);
        }
        
        function onMouseMove(event) {
            console.log("window event??");
            var location = path.getNearestLocation(event.point);
            var segment = location.segment;
            var point = segment.point;
        
            if (!point.fixed && location.distance < size.height / 4) {
                var y = event.point.y;
                point.y += (y - point.y) / 6;
                if (segment.previous && !segment.previous.fixed) {
                    var previous = segment.previous.point;
                    previous.y += (y - previous.y) / 24;
                }
                if (segment.next && !segment.next.fixed) {
                    var next = segment.next.point;
                    next.y += (y - next.y) / 24;
                }
            }
        }
        
        function onFrame(event) {
            updateWave(path);
        }
        
        function updateWave(path) {
            var force = 1 - values.friction * values.timeStep * values.timeStep;
            //console.log("path: ",path.segments);
            for (var i = 0, l = path.segments.length; i < l; i++) {
                var point = path.segments[i].point;
                var dy = (point.y - point.py) * force;
                point.py = point.y;
                point.y = Math.max(point.y + dy, 0);
            }
        
            for (var j = 0, l = springs.length; j < l; j++) {
                springs[j].update();
            }
            path.smooth({ type: 'continuous' });
        }
        
        function onKeyDown(event) {
            if (event.key == 'space') {
                console.log("SPAAAAAAAAAAAAAACEEEEEEEEEEEEE");
                path.fullySelected = !path.fullySelected;
                path.fillColor = path.fullySelected ? null : 'black';
            }
        }

        view.onFrame = function(event) {
            onFrame(event);
        }
*/
export class PaperComponent extends React.Component {
    constructor() {
        super();
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        
        this.state = {
            color: "#2c57e8",
            path: {},
            droplet: {},
            view: {},
            springs: {},
            size: {},
            counter: 0,
            values: {}
        };
    }

    handleMouseEnter(e) {
        this.setState({color:"black"});
    }

    handleMouseLeave(e) {
        this.setState({color:"#2c57e8"});
    }
    
    handleMouseMove(e) {
        //console.log("Mouse Move",e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        var path = this.state.path;
        var size = this.state.size;
        var eventPoint = new Point(e.nativeEvent.offsetX,e.nativeEvent.offsetY); //find eventPoint in terms of canvas

        this.disturbWave(eventPoint);
    }

    disturbWave(eventPoint) {
        var path = this.state.path;
        var size = this.state.size;
        
        if (path.length > 1) {
            var location = path.getNearestLocation(eventPoint); //translate eventPoint to canvas path
            var segment = location.segment; //find segment in canvas path
            var point = segment.point; //find point in segment
        
            if (!point.fixed && location.distance < size.height / 4) { //if distance is less than a 4th of the canvas height
                var y = eventPoint.y;
                point.y += (y - point.y) / 6; // move point towards mouse at 60 frames / 6 speed 
                if (segment.previous && !segment.previous.fixed) { // move the left point towards mouse
                    var previous = segment.previous.point;
                    previous.y += (y - previous.y) / 24; 
                }
                if (segment.next && !segment.next.fixed) { // move the right point towards mouse
                    var next = segment.next.point;
                    next.y += (y - next.y) / 6;
                }
                this.setState({path: path}); // broadcast movement
            }
        }
    }

    updateWave(path) {
        var path = this.state.path;
        var values = this.state.values;
        var springs = this.state.springs;
        var force = 1 - values.friction * values.timeStep * values.timeStep;
        for (var i = 0, l = path.segments.length; i < l; i++) { //Spring Out
            var point = path.segments[i].point;
            var dy = (point.y - point.py) * force; //vector math of different of two points multiplied by force
            point.py = point.y;
            point.y = Math.max(point.y + dy, 0); //prevent dy from slowing down change
        }
    
        for (var j = 0, l = springs.length; j < l; j++) { //Spring In
            springs[j].update();
        }
        //console.log("Check spring creation, spring:", springs,"this", this);
        this.setState({springs: springs});
        path.smooth({ type: 'continuous' });
        path.setFillColor(this.state.color);
    }

    updateDroplet(droplet) {
        var droplet = this.state.droplet;
        var water = this.state.path;

        var view = this.state.view;
        var counter = this.state.counter;
        //console.log(counter);
        
        droplet.position.y += 6;

        if (droplet.bounds.bottom > view.size.width) {
            droplet.position.y = -droplet.bounds.width;

            this.setState({counter: 0});
        }else if (droplet.getIntersections(water).length > 1) {
            if (counter < 10) {
                this.disturbWave(droplet.position);
            }

            this.setState({counter: this.state.counter + 1});
        }

        this.setState({droplet: droplet});
    }

    componentDidMount() {
        paper.install(window);
        paper.setup('paperCanvas');
        var values = {
            friction: 0.8,
            timeStep: 0.01,
            amount: 15,
            mass: 10,
        };
        values.invMass = 1 / values.mass;

        var path, springs;
        var size = view.bounds.size.multiply([2, 1]);
        var strength = .01;

        this.setState({view: view}); //view
        this.setState((strength) => {
            var pathtest = createPath(0.1);
            return {
              path: pathtest
            };
        }); //path
        this.setState({size: size}); //size
        this.setState({values:values}); //values

        var Spring = function(a, b, strength, restLength) { //Creating Spring Object
            this.a = a;
            this.b = b;
            this.restLength = restLength || 80; //if not defined 80
            this.strength = strength || 0.55; //if not defined .55
            this.mamb = values.invMass * values.invMass; // (1/mass)^2
        };
        
        Spring.prototype.update = function() { //Spring functionality to push points together
            var delta = this.b.subtract(this.a); //vector of two concurrent points
            var dist = delta.length; //vector length
            var normDistStrength = (dist - this.restLength) / (dist * this.mamb) * this.strength; //the springy bit of springs
            delta.y *= normDistStrength * values.invMass * 0.2;
            if (!this.a.fixed) //the last and first two points don't move
                this.a.y += delta.y; //push the two points together
            if (!this.b.fixed)
                this.b.y -= delta.y;
        };
        
        var createPath = (strength) => {
            var path = new Path({
                fillColor: '#2c57e8'
            });
            springs = [];
            for (var i = 0; i <= values.amount; i++) {
                var segment = path.add(new Point(i / values.amount, 0.5).multiply(size));
                var point = segment.point;
                if (i == 0 || i == values.amount)
                    point.y += size.height;
                point.px = point.x;
                point.py = point.y;
                // The first two and last two points are fixed:
                point.fixed = i < 2 || i > values.amount - 2;
                if (i > 0) {
                    var spring = new Spring(segment.previous.point, point, strength);
                    springs.push(spring);
                }
            }
            this.setState({springs: springs});
            path.position.x -= size.width / 4;
            return path;
        }

        var droplet = new Path.Ellipse({
			center: [view.size.width/2, 40],
			size: [24, 39],
			fillColor: 'white'
        });

        this.setState({droplet:droplet});
    }

    componentWillUnmount() {
        //this.app.stop();
    }
      

    render() {
        let component = this;
        //console.log(component);
        this.state.view.onFrame = (event) => {
            if (this.state.path.length > 1 && this.state.springs.length > 1) {
                this.updateWave(this.state.path);
                this.updateDroplet(this.state.droplet);
            }
        };
        return (
            <div>
                <canvas id="paperCanvas"
                resize
                onMouseEnter={this.handleMouseEnter} 
                onMouseLeave={this.handleMouseLeave}
                onMouseMove={this.handleMouseMove} 
                style={{width: '100%', height: '300px', opacity: '.7'}}></canvas>
            </div>
        );
    }
}

const Banner = ({post}) => (
    <section id="banner" className="major">
        <div className="inner">
            <header className="major">
                <h1>{post.frontmatter.title}</h1>
                <div style={{position: "absolute", top: "-20px", width: "100%", zIndex: '-10'}}>
                    <PaperComponent/>
                </div>
            </header>

            <div className="content">
                <p>{post.frontmatter.description}<br />
                by JWater</p>
                <ul className="actions">
                    <li><Link className="button next scrolly" to={post.frontmatter.path}>Learn About</Link></li>
                </ul>
            </div>
            
        </div>
    </section>
)

export default Banner

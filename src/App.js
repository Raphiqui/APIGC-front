import React, {Component} from 'react';
import './App.css';
import { Button, Dropdown, Image, Loader, Dimmer } from 'semantic-ui-react'
import gcApi from './api/apigc-api';
import _ from 'lodash'

export default class App extends Component {

    state = {
        options: [],
        imageURLs: null,
        isProcessing: false,
        message: null,
        setUp: false,
        fetchColor: true,
        emptyArray: false,
    };

    setUpDB = () => {

        this.setState({
            isProcessing: true,
            message: "Set up the database..."
        });

        let api = new gcApi();

        api.setUpDB().then(()=> {
            this.setState({
                isProcessing: false,
                message: null,
                setUp: true,
                fetchColor: false
            });
        });
    };

    updateDomColor = () => {
        this.setState({
            isProcessing: true,
            message: "Update dominant color for every records and fetch ids available..."
        });

        let api = new gcApi();

        api.updateDomColor().then((results)=> {
            const array = results.data.map(item => item.id);

            array.map(item => {
                const newelement = {key: item, text: item, value: item};
                this.setState({
                    options: this.state.options.concat(newelement),
                    isProcessing: false,
                    message: null,
                    fetchColor: true
                });
            })
        });
    };

    idSelection = (event) => {
        console.log(event.target.textContent);

        this.setState({
            imageURLs: [],
            isProcessing: true,
            emptyArray: false,
            message: "Fetch all the records associated..."
        });

        let api = new gcApi();

        api.fetchMatches(event.target.textContent).then((results)=> {
            console.log('RESULTS: ', results);
            if (results === false) {
                this.setState({
                    isProcessing: false,
                    emptyArray: true,
                });
            }else{
                results.data.map(item => {
                    this.setState({
                        imageURLs: this.state.imageURLs.concat(item),
                        isProcessing: false,
                        message: null
                    });
                });
            }

        });
    };

    render() {

        return (
            <div className="App">

                {this.state.isProcessing
                    ?<Dimmer active inverted>
                        <Loader size='large'>{this.state.message}</Loader>
                    </Dimmer>
                    : null
                }

                <Button.Group widths='3'>
                    <Button
                        disabled={this.state.setUp}
                        color={this.state.setUp ? null : "green"}
                        onClick={this.setUpDB}
                    >Set up datatbase
                    </Button>
                    <Button
                        disabled={this.state.fetchColor}
                        color={this.state.fetchColor ? null : "green"}
                        onClick={this.updateDomColor}
                    >Fetch dominant color
                    </Button>
                </Button.Group>

                <Dropdown
                    placeholder='Select product id'
                    fluid
                    selection
                    options={this.state.options}
                    disabled={this.state.options.length === 0}
                    onChange={this.idSelection}
                />

                {this.state.imageURLs
                    ? this.state.emptyArray
                        ? "This product seems not to have a dominant color fetched by the google cloud api," +
                        " please select another one or wait a little bit more"
                        : "Here you can see the other products related to your selection's color at 92%"
                    : null}

                {this.state.imageURLs
                    ? <Image.Group style={{ paddingTop: "10px" }} size='small'>
                        {
                            _.map(this.state.imageURLs, item => {
                                return <Image src={item} key={item}/>
                            })
                        }
                        </Image.Group>
                    : null}
            </div>
        );
    }

}
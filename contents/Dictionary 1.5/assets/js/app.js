class dictionary{

    constructor() {
        this.displayDictionary().then(e=>e);
    }

    dictionary =this.sortDictionary([
        {word: "Array", definition: "A data structure that holds an ordered collection of values, which can be of any type."},
        {word: "Object", definition: "A collection of properties and their values, enclosed within curly braces ({})."},
        {word: "Function", definition: "A block of code that can be executed multiple times, and can take inputs and return outputs."},
        {word: "Variable", definition: "A named storage location for data in a program, where the value of the variable can change during the execution of the program."},
        {word: "Loop", definition: "A control structure that allows a piece of code to be repeated a specified number of times, or until a specific condition is met."},
        {word: "Conditional", definition: "A control structure that allows a program to make decisions based on whether a specified condition is true or false."},
        {word: "String", definition: "A sequence of characters, represented by a set of quotes (either single or double quotes)."},
        {word: "Boolean", definition: "A data type that has only two values, either true or false, and is used for logical operations and conditional statements."},
        {word: "Null", definition: "A special value that represents the absence of a value or a null object reference."},
        {word: "Undefined", definition: "A value that represents the absence of a value or an undefined object property."},
        {word: "Method", definition: "A function that is associated with an object, and can be called on the object using dot notation."},
        {word: "Callback", definition: "A function that is passed as an argument to another function and is executed when a certain event occurs."},
        {word: "Class", definition: "A blueprint for creating objects (a particular data structure), providing initial values for state (member variables or attributes), and implementations of behavior (member functions or methods)."},
        {word: "Constructor", definition: "A special type of function that is called automatically when an object is created from a class."},
        {word: "Inheritance", definition: "A mechanism that allows one class to inherit the properties and methods of another class, and to add or override its own properties and methods."},
        {word: "Encapsulation", definition: "A mechanism that restricts direct access to an object's data, and instead exposes a public interface that can be used to interact with the object."},
        {word: "Abstraction", definition: "The process of hiding implementation details and exposing only the essential information to the user."},
        {word: "Polymorphism", definition: "The ability of an object to take on many forms, or to be treated as objects of many types."},
        {word: "TypeScript", definition: "A statically-typed, object-oriented language that is a strict syntactical superset of JavaScript, and adds features such as interfaces, classes, and modules."},
        {word: "ES6", definition: "The latest version of the ECMAScript standard, which adds features such as arrow functions, template literals, destructuring, and more."},
        {word: "Node.js", definition: "A JavaScript runtime built on Chrome's V8 JavaScript engine, used for server-side programming and building fast, scalable network applications."},
        {word: "Express", definition: "A fast, unopinionated, minimalist web framework for Node.js, used for building web applications and APIs."},
        {word: "React", definition: "A JavaScript library for building user interfaces, developed by Facebook. It allows developers to build reusable UI components and manage the state of their applications."},
        {word: "Vue", definition: "A progressive JavaScript framework for building user interfaces, designed for simplicity and modularity."},
        {word: "Angular", definition: "A TypeScript-based open-source web application framework, developed and maintained by Google, used for building complex single-page applications."},
        {word: "jQuery", definition: "A fast, small, and feature-rich JavaScript library, used for simplifying HTML document traversing, event handling, and animation."},
        {word: "Ajax", definition: "A set of technologies used for creating dynamic web pages, allowing data to be updated asynchronously without reloading the page."},
        {word: "JSON", definition: "A lightweight data-interchange format, used for exchanging data between a browser and a server, or between different applications."},
        {word: "REST", definition: "A software architectural style for building web services, based on the HTTP protocol and the principles of the Web."},
        {word: "API", definition: "A set of programming interfaces, protocols, and tools for building software and applications, used for accessing web-based services."},
        {word: "CRUD", definition: "An acronym for the four basic operations performed on data in a database: Create, Read, Update, and Delete."},
        {word: "Database", definition: "A collection of data stored in a computer, organized in a way that allows efficient access and manipulation of the data."},
        {word: "SQL", definition: "A standard language for managing and manipulating relational databases, used for inserting, updating, and retrieving data from a database."},
        {word: "NoSQL", definition: "A type of database management system that does not use the SQL language, and is designed for scalability and flexibility."},
        {word: "MongoDB", definition: "A cross-platform, document-oriented NoSQL database, used for storing and retrieving data as semi-structured BSON documents."},
        {word: "Redis", definition: "An open-source, in-memory data structure store, used as a database, cache, and message broker."},
        {word: "Firebase", definition: "A mobile and web application development platform, developed by Google, used for building real-time, scalable applications."},
        {word: "Server", definition: "A computer program or device that provides functionality for other programs or devices, called clients, on the same network."},
        {word: "Client", definition: "A program or device that requests services or resources from a server."},
        {word: "Protocol", definition: "A set of rules and standards that govern the communication between devices over a network, specifying how data should be transmitted."},
        {word: "TCP", definition: "A reliable, stream-oriented transport protocol, used for establishing a reliable connection between two applications over a network."},
        {word: "UDP", definition: "An unreliable, connectionless transport protocol, used for transmitting data over a network with low overhead and no guarantee of delivery."},
        {word: "IP", definition: "The Internet Protocol, used for transmitting data over a network, specifying the format of packets and routing them to their destination."},
        {word: "DNS", definition: "The Domain Name System, used for converting domain names into IP addresses, allowing the resolution of URLs to their corresponding IP addresses."},
        {word: "HTTP", definition: "The Hypertext Transfer Protocol, used for transmitting data over the web, specifying the format of requests and responses between a client and a server."},
        {word: "HTTPS", definition: "The secure version of HTTP, providing encrypted communication between a client and a server, and verifying the identity of the website."},
        {word: "FTP", definition: "The File Transfer Protocol, used for transmitting files over a network, specifying the format of requests and responses for transferring files."},
        {word: "SMTP", definition: "The Simple Mail Transfer Protocol, used for transmitting email messages over the Internet, specifying the format of email messages."},
        {word: "POP", definition: "The Post Office Protocol, used for retrieving email messages from a server, specifying the format of requests and responses for email retrieval."},
        {word: "IMAP", definition: "The Internet Message Access Protocol, used for accessing email messages stored on a server, specifying the format of requests and responses for email retrieval."},
        {word: "SSL", definition: "The Secure Sockets Layer, used for encrypting communication over the Internet, providing authentication and privacy for online transactions."},
        {word: "TLS", definition: "The Transport Layer Security, a successor to SSL, used for encrypting communication over the Internet, providing authentication and privacy for online transactions."},
        {word: "SSH", definition: "The Secure Shell, used for secure communication over a network, providing secure shell access to network devices and remote servers."},
        {word: "VPN", definition: "The Virtual Private Network, used for creating a secure and private connection over a public network, allowing remote access to a private network."},
        {word: "Load Balancer", definition: "A device that distributes incoming network traffic across multiple servers, improving the performance and availability of applications."},
        {word: "Router", definition: "A device that forwards data packets between networks, routing them to their destination based on their IP addresses."},
        {word: "Switch", definition: "A device that connects devices on a network, forwarding and filtering data based on the MAC addresses of the devices."},
        {word: "Hub", definition: "A device that connects multiple devices on a network, broadcasting incoming data to all connected devices."},
        {word: "Bridge", definition: "A device that connects two separate networks, forwarding data between them based on their MAC addresses."},
        {word: "Modem", definition: "A device that converts digital data into analog signals, allowing it to be transmitted over analog communication networks."},
        {word: "Wi-Fi", definition: "A wireless networking technology that uses radio waves to provide wireless high-speed Internet and network connections."},
        {word: "Bluetooth", definition: "A wireless communication technology that uses short-range radio waves to provide simple and secure wireless connections between devices."},
        {word: "NFC", definition: "The Near Field Communication, a short-range wireless communication technology, used for simple and secure wireless transactions between devices."},
        {word: "GPS:", definition: "The Global Positioning System, a satellite-based navigation system, providing location and time information anywhere on the Earth."},
        {word: "RAM", definition: "The Random Access Memory, a type of computer memory, used for storing data temporarily, allowing fast and efficient access to data."},
        {word: "ROM", definition: "The Read-Only Memory, a type of computer memory, used for storing data permanently, preserving it even after the power is turned off."},
        {word: "Cache", definition: "A type of computer memory, used for storing frequently accessed data, providing faster access to data and reducing the number of disk I/O operations."},
        {word: "Storage", definition: "A type of computer memory, used for storing data permanently, allowing it to be retrieved and reused later."},
        {word: "Hard Drive", definition: "A type of computer storage, used for storing large amounts of data permanently, providing fast and reliable data access."},
        {word: "Solid State Drive", definition: "A type of computer storage, used for storing data permanently, providing faster and more reliable data access than a hard drive."},
        {word: "File System", definition: "A system for organizing and storing files on a computer, providing a hierarchical structure for files and directories."},
        {word: "Operating System", definition: "A system software that manages computer hardware and software resources, providing a platform for running applications."},
        {word: "Kernel", definition: "The core component of an operating system, responsible for managing the resources of the computer, including memory and CPU usage."},
        {word: "Process", definition: "An instance of a program, running in a separate environment, with its own memory space and system resources."},
        {word: "Thread", definition: "A light-weight process, sharing the same memory space and system resources, allowing for efficient multitasking and parallel processing."},
        {word: "Scheduler", definition: "A component of an operating system, responsible for scheduling the execution of processes and threads, ensuring efficient use of system resources."},
        {word: "Virtual Memory", definition: "A feature of an operating system, allowing a process to access more memory than is physically available, using disk storage as an extension of RAM."},
        {word: "Virtual Machine", definition: "An abstraction of a physical computer, allowing multiple operating systems to run on the same physical machine, isolated from each other."},
        {word: "Hypervisor", definition: "A layer of software, between the operating system and the physical hardware, managing virtual machines and their resources."},
        {word: "Cloud Computing", definition: "A model for delivering computing services, such as servers, storage, and databases, over the Internet, on a pay-per-use basis."},
        {word: "Infrastructure as a Service", definition: "A type of cloud computing, providing computing infrastructure, such as virtual machines and storage, as a service."},
        {word: "Platform as a Service", definition: "A type of cloud computing, providing a platform for developing and running applications, without having to manage the underlying infrastructure."},
        {word: "Software as a Service", definition: "A type of cloud computing, providing software applications as a service, over the Internet, on a pay-per-use basis."},
        {word: "Container", definition: "A lightweight and isolated environment, used for packaging and running applications, allowing them to be moved easily from one computing environment to another, without having to worry about dependencies or configuration issues."},
        {word: "Microservices", definition: "An architectural style for building and deploying applications, as a collection of small and independent services, communicating through APIs."},
        {word: "API", definition: "An Application Programming Interface, a set of rules and protocols for accessing a web-based software application or web tool."},
        {word: "Web Service", definition: "A service provided by an application, available over the Internet, using standardized protocols and data formats, allowing applications to exchange data and functionality."},
        {word: "REST", definition: "Representational State Transfer, a software architectural style, used for designing web services, based on the principles of HTTP and the Web."},
        {word: "SOAP", definition: "Simple Object Access Protocol, a protocol for exchanging structured information, using XML, in the implementation of web services."},
        {word: "JSON", definition: "JavaScript Object Notation, a lightweight data interchange format, based on a subset of JavaScript, used for exchanging data between applications."},
        {word: "XML", definition: "Extensible Markup Language, a markup language, used for storing and transporting data, providing a flexible and human-readable format for data exchange."},
        {word: "HTTP", definition: "Hypertext Transfer Protocol, a protocol for exchanging information on the World Wide Web, used for transmitting data from a web server to a web browser."},
        {word: "HTTPS", definition: "Hypertext Transfer Protocol Secure, a secure version of HTTP, used for transmitting sensitive data over the Internet, protecting it from interception and tampering."},
        {word: "FTP", definition: "File Transfer Protocol, a standard network protocol, used for transferring files between computers on a network, or from a computer to a server on the Internet."},
        {word: "SMTP", definition: "Simple Mail Transfer Protocol, a protocol for transmitting electronic mail, used by email servers and clients, for sending and receiving email messages."},
        {word: "POP", definition: "Post Office Protocol, a protocol for retrieving email messages, used by email clients, for retrieving messages from an email server."},
        {word: "IMAP", definition: "Internet Message Access Protocol, a protocol for accessing email messages, used by email clients, for accessing messages stored on a remote email server."},
        {word: "TCP", definition: "Transmission Control Protocol, a protocol for transmitting data, used in the Internet Protocol suite, for establishing a reliable and error-free communication channel between applications."},
        {word: "UDP", definition: "User Datagram Protocol, a protocol for transmitting data, used in the Internet Protocol suite, for transmitting data in a fast and unreliable manner."},
        {word: "IP", definition: "Internet Protocol, a protocol for transmitting data, used in the Internet Protocol suite, for transmitting data packets between computers on a network or the Internet."},
        {word: "DNS", definition: "Domain Name System, a system for translating domain names into IP addresses, allowing users to access web sites and other Internet services using human-readable names."},
        {word: "DHCP", definition: "Dynamic Host Configuration Protocol, a protocol for automatically assigning IP addresses to devices on a network, allowing them to communicate with each other."},
        {word:"NAT", definition: "Network Address Translation, a technique for remapping one IP address space into another, by modifying network address information in the IP header of packets, while they are in transit across a traffic-forwarding device."},
        {word: "VPN", definition: "Virtual Private Network, a secure network, created by extending a private network across a public network, allowing remote users to securely access a private network."},
        {word: "Firewall", definition: "A network security system, that monitors and controls incoming and outgoing network traffic, based on predetermined security rules."},
        {word: "Load Balancer", definition: "A device that distributes network or application traffic across multiple servers, improving application availability and responsiveness, by preventing any single server from becoming a bottleneck."},
        {word: "Router", definition: "A device that forwards data packets along networks, connecting multiple networks together, and determining the best path for data to travel, based on its current network conditions."},
        {word: "Switch", definition: "A device that connects devices together, allowing them to communicate with each other, by forwarding data packets between devices, based on the destination MAC address."},
        {word: "Hub", definition: "A device that connects devices together, allowing them to communicate with each other, by repeating data packets, sent to all connected devices."},
        {word: "Bridge", definition: "A device that connects networks together, allowing them to communicate with each other, by forwarding data packets between networks, based on the destination MAC address."},
        {word: "Modem", definition: "A device that modulates an analog carrier signal to encode digital information, and demodulates the received analog carrier signal to decode the transmitted digital information."},
        {word: "ISP", definition: "Internet Service Provider, a company that provides Internet access and related services, to users, by offering connection to the Internet."},
        {word: "WAN", definition: "Wide Area Network, a telecommunications network, that extends over a large geographic area, connecting multiple LANs and/or MANs, and providing communication between remote sites."},
        {word: "LAN", definition: "Local Area Network, a computer network, that interconnects computers within a limited area, such as a residence, school, laboratory, or office building, using network media."},
        {word: "MAN", definition: "Metropolitan Area Network, a computer network, that interconnects users with computer resources in a geographic area or region larger than a LAN, but smaller than a WAN, such as a city."},
        {word: "SAN", definition: "Storage Area Network, a high-speed network, that provides block-level access to storage, to various servers, creating a storage pool, shared by multiple servers."},
        {word: "NAS", definition: "Network-Attached Storage, a file-level computer data storage server, connected to a computer network, allowing multiple clients to access and share its storage."},
        {word: "Cloud Computing", definition: "A model for delivering information technology services, over the Internet, on a pay-per-use basis, providing on-demand access to a shared pool of configurable computing resources."},
        {word: "SaaS", definition: "Software as a Service, a delivery model for software applications, where the provider hosts the application, and makes it available over the Internet, to customers, on a subscription basis."}

]);
    /*
    searchDictionary
     */
    async searchDictionary(terms){

        let dictionary = this.dictionary;
        let found = false;
        if (dictionary.length){
            dictionary.forEach((item)=>{
                if (item.word.toLowerCase().startsWith(terms.toLowerCase())){
                    found = item;
                }
            });
        }

        if (found){
            await this.displayDisplayDefinition(found.definition, found.word);
        }
    }

    // sort data

    sortDictionary(object){

        object.sort((a, b) => {
            if (a.word < b.word) {
                return -1;
            }
            if (a.word > b.word) {
                return 1;
            }
            return 0;
        });

        return object;
    }

    scrollToWord(word){
        // var word = word.toLowerCase();
        // var targetElement = $(".dictionary-body-section-contents").find(".dictionary-body-rows[id='" + word + "']");
        // var targetElementTop = targetElement.position().top;
        // var scrollContainer = $(".dictionary-body-section-contents");
        // var scrollContainerTop = scrollContainer.scrollTop();
        // var scrollContainerHeight = scrollContainer.height();
        // var targetMiddlePosition = targetElementTop - (scrollContainerHeight / 2) + (targetElement.outerHeight() / 2);
        // scrollContainer.animate({
        //     scrollTop: targetMiddlePosition
        // }, 0);

    }


    // displaying definition
    async displayDisplayDefinition(text,headingText){

        let dictionary = this.dictionary;

        let originalText = text.split(' ');
        text = text.toLowerCase().split(' ');

        if (dictionary.length){
            dictionary.forEach(({word,definition})=>{
                let wordDictionary = word.toLowerCase();
               if (text.includes(wordDictionary)){
                   let index = text.indexOf(wordDictionary);
                   originalText[index] = ` <a class="searchMeaning ml-2 mr-2" definition="${definition}">${word}</a>`;
               }
            });
        }
        originalText = originalText.join(' ');

        $('.selectedWord').text(headingText);
        $('.textDefinition').html(originalText);
        $('.displayLetter').text(headingText.split('')[0]);
        this.scrollToWord(headingText);
    }

    //display dictionary
    async displayDictionary(){

        let template = $('dictionaryTemp').html();

        let dictionary = this.dictionary;

        dictionary = this.sortDictionary(dictionary);

        let data = '';
        if (dictionary.length){
            dictionary.forEach(({definition,word})=>{
                data += template.split('{word}').join(word).split('{definition}').join(definition).split('{word2}').join(word.toLowerCase());
            });
        }

        $('.dictionary-body-section-contents').html(data);
    }
}

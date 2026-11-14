Cybersecurity labs

# Bongani Young

- SOC analyst
- Ethical hacker
- OSINT investigator

I train by doing. This page logs the labs, courses and credentials behind my work in network penetration testing, web application security and threat intelligence.

[@bonganiyoung10 on X](https://x.com/bonganiyoung10)

## Toolkit

Used in the labs below

Chisel

Fast TCP/UDP tunnelling over HTTP

Socat

Socket relaying and port forwarding

extractPorts

Scripted port extraction from scan output

Network discovery

Scanning and enumeration across hosts

OSINT collection

Sourcing and analysing open-source data

## Lab log

5 entries

LabNetwork penetration testing

### CWE Fully Compromised Network Lab

A multi-host penetration test run as one complete attack chain. I gained initial access, enumerated the hosts, analysed vulnerabilities, then moved laterally and escalated privileges across several systems. To reach deeper into the segmented network I built tunnels and proxies with Chisel and Socat, which gave me access to internal services, including Grafana dashboards.

Attack path

1. Initial access
2. Enumeration
3. Vulnerability analysis
4. Lateral movement
5. Privilege escalation
6. Pivot with Chisel and Socat
7. Internal services (Grafana)

Chisel

Tunnelled traffic over HTTP to reach internal segments.

Socat

Relayed sockets and forwarded ports between hosts.

CourseHackers-Arise

### Web App Hacking V8, Day 1

The opening day of the course focused on how to think before exploiting anything. I worked through the introductory modules, studied diagrams of modern web stacks and started the practical lab environment. The day sets up later modules on injection attacks, authentication flaws and access control issues.

How a tester reasons

1. Concept
2. Architecture
3. Normal behaviour
4. Trust boundaries
5. Vulnerabilities

Anatomy of a modern web application

1. Browser
2. CDN
3. WAF
4. Reverse proxy / load balancer
5. API gateway
6. Microservices
7. Databases / caches

Every arrow in that diagram is a trust boundary, and every trust boundary is a potential attack surface.

TrainingAdvanced penetration testing track

### CWE Training, Day 1: Enumeration and vulnerability analysis

The first day of the CWE preparation track was about scanning, enumeration and finding weaknesses in a systematic way. I worked in the terminal on extractPorts scripting and network discovery while following the course outline on the training platform. It builds the repeatable method that professional engagements depend on.

Modules covered

- Scanning and enumeration
- Identifying weaknesses
- Path traversal
- Privilege escalation vectors
- Initial exploitation

CertificationEC-Council

### Certified Threat Intelligence Analyst (CTIA)

I am currently working toward the CTIA certification, which covers the full threat intelligence lifecycle. My studies focus on the collection and analysis phases, where raw indicators and open-source data become intelligence that a SOC or a decision-maker can act on.

Intelligence lifecycle

1. Planning and direction
2. Collection
3. Processing
4. Analysis
5. Production
6. Dissemination

Conference2026

### OxCon 2026

I attended OxCon 2026, a cybersecurity conference on emerging threats and practical skills. The sessions showed where the field is heading, especially how AI changes both attack and defence, and the event gave me time to talk with other practitioners.

Sessions and themes

- Malware analysis
- AI risks and AI security
- Email security
- Pentesting with AI assistance

## Where this points

My labs run from web application fundamentals and structured penetration testing methodology, through full network compromise with pivoting, to formal threat intelligence training. That combination suits SOC, red team and threat intelligence roles.

Follow the work as it happens: [@bonganiyoung10](https://x.com/bonganiyoung10)
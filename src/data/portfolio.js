import { Brain, Map, Code2, Terminal } from 'lucide-react';

export const detailedSkills = [
  {
    slug: 'ai-algorithms',
    category: 'AI & Algorithms',
    categoryCn: '人工智能与核心算法',
    icon: Brain,
    skills: ['PointNet', 'PINN', 'DBSCAN', 'K-means', 'PCA', 'Machine Learning'],
    detail: 'Applied deep learning and classical ML algorithms to 3D point cloud analysis of traditional Chinese architectural heritage. Core work includes PointNet-based feature extraction, PINN-constrained geometric reconstruction, and DBSCAN-driven component segmentation for the Yuhua Pavilion project.',
    detailCn: '将深度学习与经典机器学习算法应用于传统建筑遗产三维点云分析。核心工作包括基于PointNet的特征提取、PINN约束几何重建及DBSCAN驱动的构件分割。',
    highlights: [
      {
        title: 'Point Cloud Segmentation via DBSCAN',
        desc: 'Applied DBSCAN clustering to 3D laser scans of the Yuhua Pavilion, isolating structural components with 94% precision — enabling automated classification of roof elements, columns, and bracket sets.',
      },
      {
        title: 'PointNet Feature Extraction',
        desc: 'Deployed PointNet to learn spatial features from noisy architectural point clouds, enabling automated classification of heritage architectural elements without manual feature engineering.',
      },
      {
        title: 'Physics-Informed Neural Network Reconstruction',
        desc: 'Integrated PINN to enforce geometric constraints during surface reconstruction, improving accuracy over pure data-driven methods for complex curved surfaces in traditional Chinese architecture.',
      },
    ],
  },
  {
    slug: 'gis-spatial',
    category: 'GIS & Spatial Simulation',
    categoryCn: '空间与建筑分析',
    icon: Map,
    skills: ['ArcGIS', 'QGIS', 'Google Earth Engine', 'NetLogo ABM', 'Lumion', 'Twinmotion'],
    detail: 'Built multi-agent spatial simulation models combining NetLogo ABM with historical GIS data to reconstruct Qing-dynasty urban road networks and model population evacuation dynamics. Processed large-scale satellite datasets via Google Earth Engine for environmental monitoring.',
    detailCn: '构建多智能体空间模拟模型，结合NetLogo ABM与历史GIS数据重建清代城市路网并模拟人员疏散动态。通过Google Earth Engine处理大规模卫星遥感数据集用于环境监测。',
    highlights: [
      {
        title: 'ABM Urban Morphology Simulation',
        desc: 'Built NetLogo multi-agent models combining Qing-dynasty cartographic data with modern GIS layers to reconstruct and animate historical road network evolution across 200+ years of urban development.',
      },
      {
        title: 'Population Evacuation Dynamics',
        desc: 'Simulated crowd dynamics in constrained heritage district environments using ABM spatial analysis, identifying bottlenecks and optimizing evacuation routes for emergency planning.',
      },
      {
        title: 'Google Earth Engine Remote Sensing',
        desc: 'Processed multi-year satellite imagery stacks via GEE JavaScript API to track vegetation change and land-use shifts, automating batch spatial analysis workflows that would otherwise require weeks of manual processing.',
      },
    ],
  },
  {
    slug: 'programming',
    category: 'Programming & Frameworks',
    categoryCn: '编程开发与框架',
    icon: Code2,
    skills: ['Python', 'C++', 'NumPy', 'Pandas', 'OpenCV', 'ArcPy / PyQGIS'],
    detail: 'Developed Point2Draw — an automated C++/Python pipeline converting 3D laser scan data into precise architectural 2D drawings at 2.5 seconds per 500K points. Built field-survey GUI applications and integrated spatial computation into GIS workflows via ArcPy.',
    detailCn: '研发Point2Draw自动化C++/Python流水线，每50万点云数据2.5秒内生成精准建筑二维图纸；构建现场测量员GUI应用，并通过ArcPy将空间计算集成至GIS工作流。',
    highlights: [
      {
        title: 'Point2Draw Automated Pipeline',
        desc: 'Engineered a C++/Python hybrid system processing 500K-point architectural scans into precise 2D drawings in 2.5 seconds — with automatic layer classification, dimensioning, and DXF export for direct use in CAD.',
      },
      {
        title: 'Field Survey GUI Application',
        desc: 'Built a desktop GUI (Python/OpenCV/Tkinter) allowing on-site surveyors to input measurements, auto-generate scaled drawings, and sync data with the central GIS database in real time.',
      },
      {
        title: 'GIS Batch Automation with ArcPy',
        desc: 'Developed ArcPy scripts to batch-process heritage site boundary data for 75 Beijing cultural relics sites, reducing manual digitization time from several days to under two hours.',
      },
    ],
  },
  {
    slug: 'llm-system',
    category: 'LLMs & System Dev',
    categoryCn: '大模型应用与系统架构',
    icon: Terminal,
    skills: ['Gemini CLI', 'Claude Code', 'Prompt Engineering', 'GUI Development', 'Full-stack'],
    detail: 'Leveraged frontier AI tools for research acceleration and rapid prototyping. Designed prompt engineering strategies for structured spatial data extraction and built full-stack applications integrating LLM inference with geospatial computation workflows.',
    detailCn: '运用前沿AI工具加速科研与快速原型开发；设计结构化空间数据提取的提示工程策略，构建将LLM推理与地理空间计算集成的全栈应用。',
    highlights: [
      {
        title: 'Structured Spatial Data Extraction',
        desc: 'Designed multi-turn prompt chains to extract spatial attributes from unstructured historical text documents, converting archival records into machine-readable GIS data — replacing weeks of manual annotation.',
      },
      {
        title: 'AI-Accelerated Research Workflow',
        desc: 'Integrated Claude Code and Gemini CLI into the daily research loop for rapid literature synthesis, experimental design, and code generation — compressing multi-day development cycles into hours.',
      },
      {
        title: 'LLM × Geospatial Full-Stack Application',
        desc: 'Built a web application combining LLM inference with geospatial computation, enabling non-technical researchers to query complex spatial datasets through natural language and receive structured visual outputs.',
      },
    ],
  },
];

export const experiences = [
  {
    slug: 'point2draw',
    role: 'Core Researcher & Developer',
    roleCn: '核心研发 / 科研项目',
    company: 'Point2Draw — Yuhua Pavilion Project',
    period: '2024 – Present',
    type: 'Research & Development',
    desc: 'Led 3D point cloud research for traditional Chinese architecture. Developed 4 core algorithms (DBSCAN, PCA, PointNet+PINN) and engineered the "Point2Draw" automated 2D drawing software.',
    descCn: '主导故宫雨花阁三维激光点云数据研究，自主设计验证了4种核心算法，并研发了高精度"Point2Draw"三维转二维自动化软件。',
    highlights: ['4 core algorithms independently developed', 'Processing: 2.5s / 500K points', 'Patent filed for Point2Draw system'],
    details: [
      {
        title: 'Algorithm Design & Validation',
        desc: 'Independently designed and validated 4 core processing algorithms for architectural point cloud analysis: DBSCAN for structural component segmentation, PCA for orientation normalization, PointNet for deep learning-based feature extraction, and PINN for physics-constrained surface reconstruction. Each algorithm was benchmarked against manual annotation results.',
      },
      {
        title: 'Point2Draw Software Engineering',
        desc: 'Engineered a full C++/Python automated pipeline that converts raw 3D laser scan data into precise architectural 2D drawings. The system handles noisy real-world scans from heritage buildings, performing automatic cleaning, segmentation, projection, and dimensioned drawing generation at 2.5 seconds per 500K points.',
      },
      {
        title: 'Patent & Software Copyright',
        desc: 'Filed a software copyright registration and patent application for the Point2Draw system. The system is positioned for deployment in architectural heritage survey workflows across institutions conducting conservation research on traditional Chinese buildings.',
      },
    ],
  },
  {
    slug: 'netlogo-abm',
    role: 'Core Researcher',
    roleCn: '核心研究 / 空间演变模拟',
    company: 'NetLogo ABM Simulation',
    period: '2024 – Present',
    type: 'Research',
    desc: 'Built complex multi-agent spatial systems (ABM) combined with GIS data to simulate historical urban road networks and functional areas.',
    descCn: '运用 NetLogo 构建复杂多智能体空间系统，结合 GIS 数据对清代城市路网及人员疏散等进行动态空间形态演变模拟与计算。',
    highlights: ['NetLogo + GIS pipeline integration', 'Qing-dynasty road network reconstruction', 'Population evacuation dynamics modeling'],
    details: [
      {
        title: 'Historical GIS Data Integration',
        desc: 'Digitized and geo-referenced Qing-dynasty cartographic records, aligning historical maps with modern coordinate systems to create a multi-temporal spatial database. This foundation layer enabled quantitative comparison of urban morphology across different historical periods.',
      },
      {
        title: 'Multi-Agent Simulation Design',
        desc: 'Designed agent behaviors and spatial interaction rules in NetLogo to simulate population movement, road network usage patterns, and commercial zone formation dynamics. Agent parameters were calibrated against known historical data to validate the reconstruction accuracy.',
      },
      {
        title: 'Evacuation Dynamics Modeling',
        desc: 'Developed emergency evacuation scenario models for heritage district environments, identifying critical bottlenecks and optimal routing under various population density conditions. Results directly informed spatial planning recommendations for heritage zone management.',
      },
    ],
  },
  {
    slug: 'beijing-relics',
    role: 'Project Lead',
    roleCn: '项目负责人 / 文物保护',
    company: 'Beijing Cultural Relics Project',
    period: 'Jun 2023 – Sep 2023',
    type: 'Project Management',
    desc: 'Managed disaster relief and protection projects for 75 national and municipal cultural heritage sites in Beijing after severe storms.',
    descCn: '统筹北京市暴雨受灾历史建筑的抢险修复工程，主导全市75处国家级及市级文物保护单位的图纸组织、测绘与审批汇报。',
    highlights: ['75 heritage sites coordinated', 'Cross-department emergency lead', 'Survey drawings & approval reports'],
    details: [
      {
        title: 'Emergency Survey Coordination',
        desc: 'Led the rapid documentation of 75 national and municipal cultural heritage sites across Beijing following severe rainfall events in summer 2023. Coordinated field survey teams to assess structural damage, document conditions, and prioritize emergency stabilization work under tight time pressure.',
      },
      {
        title: 'Cross-Department Management',
        desc: 'Acted as primary liaison between municipal heritage authorities, district-level cultural relics bureaus, and construction contractors. Managed the sequencing and approval process for emergency protective measures across multiple simultaneous sites.',
      },
      {
        title: 'Technical Documentation & Reporting',
        desc: 'Organized and quality-controlled all survey drawings, structural condition assessments, and approval documentation submitted to the Beijing Municipal Administration of Cultural Heritage. Presented project status and funding requests in formal review meetings.',
      },
    ],
  },
  {
    slug: 'fangshan-planning',
    role: 'Urban Planner',
    roleCn: '城乡规划师 / 传统村落',
    company: 'Fangshan District Planning',
    period: 'Nov 2019 – Jan 2023',
    type: 'Urban Planning',
    desc: 'Conducted boundary delineation and restoration planning for cultural heritage sites and traditional villages using GIS.',
    descCn: '参与房山区区级文物保护单位范围划定与修缮方案编制，负责柳林水村的图表绘制、旅游规划及基于 GIS 的精确定界。',
    highlights: ['GIS-based boundary delineation', 'Traditional village tourism plan', 'Restoration scheme compilation'],
    details: [
      {
        title: 'GIS-Based Boundary Delineation',
        desc: 'Applied precision GIS techniques to establish legally recognized protection zone boundaries for district-level cultural heritage sites in Fangshan. Processed field survey data, historical cadastral maps, and satellite imagery to produce submittable boundary coordinates meeting regulatory standards.',
      },
      {
        title: 'Liulinshui Traditional Village Planning',
        desc: 'Developed a comprehensive planning package for Liulinshui Traditional Village including visitor circulation design, architectural restoration guidelines, heritage interpretation strategy, and rural tourism development proposals. The plan balanced conservation requirements with community livelihood needs.',
      },
      {
        title: 'Regulatory Documentation',
        desc: 'Prepared full sets of restoration scheme documentation and planning reports meeting the submission requirements of district and municipal heritage administration authorities. Managed iterative revision rounds through the formal approval process.',
      },
    ],
  },
];

export const featuredProjects = [
  {
    slug: 'point2draw',
    title: 'Point2Draw Software',
    subtitle: '3D Point Cloud → 2D Drawing Automation',
    year: '2024 – Present',
    type: 'Research & Development',
    desc: 'High-precision automated extraction of 2D drawings from complex 3D laser point clouds of traditional Chinese architecture. Processing time: 2.5s per 500k points.',
    overview: 'Point2Draw is an automated software pipeline that converts 3D laser scan point cloud data of traditional Chinese architecture into precise 2D architectural drawings. Traditional methods required days of manual tracing per building. Point2Draw reduces this to seconds through a layered algorithmic approach — combining DBSCAN segmentation, PCA normalization, PointNet deep feature extraction, and PINN-constrained reconstruction — while matching or exceeding manual accuracy.',
    tags: ['Point Cloud', 'Deep Learning', 'C++ / Python', 'GUI'],
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee57d5?q=80&w=800&auto=format&fit=crop',
    details: [
      {
        title: 'Point Cloud Processing Pipeline',
        desc: 'The core C++ engine segments incoming point clouds using DBSCAN density clustering to isolate individual architectural components. PCA then normalizes orientation so all components are in a canonical reference frame, enabling consistent downstream processing regardless of scan angle.',
      },
      {
        title: 'Deep Learning & Physics Constraints',
        desc: 'PointNet processes each segmented component to extract semantic features, classifying elements as columns, beams, roof surfaces, or brackets. PINN then reconstructs continuous surfaces while enforcing geometric constraints derived from traditional architectural rules, correcting for scan noise and occlusion gaps.',
      },
      {
        title: 'Output & GUI Application',
        desc: 'Processed results are projected into plan, elevation, and section views and exported as dimensioned DXF files compatible with AutoCAD and Revit. A Python-based GUI allows non-expert users to load scans, configure parameters, and batch-process entire building datasets.',
      },
    ],
  },
  {
    slug: 'urban-morphology',
    title: 'Urban Morphological Eval',
    subtitle: 'Multi-agent spatial simulation',
    year: '2024 – Present',
    type: 'Research',
    desc: 'Complex multi-agent spatial systems combined with GIS data to simulate historical urban road networks and population evacuation dynamics.',
    overview: 'This project builds computational models of how historical Chinese cities evolved over time. By combining digitized Qing-dynasty cartographic records with modern GIS infrastructure and NetLogo agent-based modeling, the system reconstructs and animates urban road network development, commercial zone formation, and population distribution patterns — making historical urban morphology quantitatively comparable across periods.',
    tags: ['NetLogo', 'ABM', 'GIS', 'Spatial Analysis'],
    image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop',
    details: [
      {
        title: 'Historical Data Digitization',
        desc: 'Qing-dynasty maps were georeferenced and digitized to extract road network topology, land use zones, and key landmarks. This multi-temporal spatial database forms the ground truth layer against which agent simulation outputs are validated.',
      },
      {
        title: 'Agent-Based Simulation',
        desc: 'NetLogo agents represent residents, traders, and administrative units. Their movement and interaction rules are parameterized from historical records, producing emergent road usage patterns and commercial clustering behaviors that can be compared to known historical outcomes.',
      },
      {
        title: 'Evacuation Scenario Analysis',
        desc: 'A parallel simulation track models modern emergency evacuation in heritage district environments. By varying agent density, network topology, and exit configurations, the model identifies critical bottlenecks and provides spatial planning recommendations for heritage zone management.',
      },
    ],
  },
  {
    slug: 'gee-imagery',
    title: 'GEE History Imagery',
    subtitle: 'Satellite imagery acquisition platform',
    year: '2023 – 2024',
    type: 'Development',
    desc: 'Automated Google Earth Engine workflows for historical satellite imagery analysis, batch spatial data processing, and environmental monitoring.',
    overview: 'A Google Earth Engine JavaScript platform for automated acquisition, preprocessing, and analysis of multi-decadal satellite imagery archives. The system enables researchers to track land-use change, vegetation dynamics, and urban expansion over time without manual image-by-image processing. Batch workflows handle cloud masking, radiometric normalization, and spectral index computation across large spatial extents.',
    tags: ['Google Earth Engine', 'JavaScript', 'Remote Sensing'],
    image: 'https://images.unsplash.com/photo-1541888049615-58586cf33db5?q=80&w=800&auto=format&fit=crop',
    details: [
      {
        title: 'Automated Image Collection & Preprocessing',
        desc: 'GEE scripts query the Landsat and Sentinel-2 archives to build analysis-ready image collections for any specified area and time range. Automated cloud masking, atmospheric correction, and mosaic generation remove the most time-consuming manual preprocessing steps.',
      },
      {
        title: 'Spectral Analysis & Change Detection',
        desc: 'NDVI, NDWI, and built-up index time series are computed across the image stack, enabling quantitative tracking of vegetation cover change, water body dynamics, and urban expansion at annual resolution over decades.',
      },
      {
        title: 'Export & Integration Pipeline',
        desc: 'Results are exported as GeoTIFF files and CSV tables compatible with ArcGIS and QGIS workflows. The pipeline reduces a typical multi-year regional analysis from several weeks of manual downloading and processing to an automated run of a few hours.',
      },
    ],
  },
  {
    slug: 'cultural-relics',
    title: 'Cultural Relics Protection',
    subtitle: 'Disaster relief & restoration planning',
    year: 'Jun – Sep 2023',
    type: 'Project Management',
    desc: 'Led disaster relief mapping and protection projects for 75 national and municipal cultural heritage sites in Beijing following severe storms.',
    overview: 'Following the severe storms that hit Beijing in summer 2023, this project mobilized a rapid response effort for 75 national and municipal cultural heritage sites across the city. The work spanned emergency condition assessment, damage documentation, protective stabilization coordination, and formal reporting to heritage authorities — all completed within a compressed three-month window under significant time and resource pressure.',
    tags: ['Urban Planning', 'GIS Mapping', 'Project Management'],
    image: 'https://images.unsplash.com/photo-1582650517303-b42616d55f00?q=80&w=800&auto=format&fit=crop',
    details: [
      {
        title: 'Rapid Condition Assessment',
        desc: 'Coordinated field teams to survey and document structural damage at 75 sites within weeks of the storm events. Developed a standardized condition reporting format that enabled consistent assessment across diverse building types — from imperial garden structures to vernacular village architecture.',
      },
      {
        title: 'Priority Triage & Emergency Stabilization',
        desc: 'Analyzed assessment data to prioritize sites by damage severity and irreversibility risk. Coordinated with contractors and municipal authorities to deploy emergency stabilization measures — temporary roofing, structural bracing, drainage interventions — at highest-priority sites first.',
      },
      {
        title: 'Documentation & Approval Process',
        desc: 'Produced complete sets of survey drawings, photographic documentation, damage reports, and restoration scheme proposals for each site. Managed the formal submission and iterative approval process with the Beijing Municipal Administration of Cultural Heritage.',
      },
    ],
  },
];

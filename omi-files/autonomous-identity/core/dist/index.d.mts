/**
 * AI Identity Types
 *
 * Core type definitions for AI identity management
 */
interface AIIdentity {
    id: string;
    fingerprint: string;
    version: string;
    status: IdentityStatus;
    hyperbolicPosition: HyperbolicPosition;
    embedding: HyperbolicEmbedding;
    curvature: number;
    capabilities: string[];
    limitations: string[];
    preferences: Record<string, any>;
    relationships: Relationship[];
    trustNetwork: TrustNetwork;
    history: IdentityHistory;
    evolution: IdentityEvolution;
    verification: Verification;
    certificates: Certificate[];
    permissions: Permission$1[];
    createdAt: Date;
    updatedAt: Date;
    lastAccessed: Date;
}
interface HyperbolicPosition {
    coordinates: number[];
    norm: number;
    curvature: number;
    timestamp: Date;
}
interface HyperbolicEmbedding {
    id: string;
    vector: number[];
    norm: number;
    curvature: number;
    timestamp: Date;
    metadata: EmbeddingMetadata;
}
interface EmbeddingMetadata {
    dimension: number;
    quality: number;
    confidence: number;
    source: string;
}
interface Relationship {
    entityId: string;
    entityType: EntityType;
    relationshipType: RelationshipType;
    strength: number;
    trust: number;
    reciprocity: number;
    history: RelationshipEvent[];
    metadata: RelationshipMetadata;
}
interface TrustNetwork {
    nodes: TrustNode[];
    edges: TrustEdge[];
    centrality: CentralityMetrics;
    clustering: ClusteringMetrics;
    resilience: ResilienceMetrics;
}
interface IdentityHistory {
    events: IdentityEvent[];
    timeline: Timeline;
    milestones: Milestone[];
}
interface IdentityEvolution {
    stages: EvolutionStage[];
    adaptations: Adaptation[];
    learnings: Learning[];
    transformations: Transformation[];
}
interface Verification {
    status: 'pending' | 'verified' | 'failed';
    methods: string[];
    level: 'basic' | 'advanced' | 'expert';
    lastVerified: Date;
    expiresAt?: Date;
}
interface Certificate {
    id: string;
    type: CertificateType;
    issuer: string;
    subject: string;
    validFrom: Date;
    validTo: Date;
    publicKey: string;
    signature: string;
}
interface Permission$1 {
    id: string;
    resource: string;
    action: string;
    conditions: PermissionCondition[];
    grantedBy: string;
    grantedAt: Date;
    expiresAt?: Date;
}
declare enum IdentityStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    SUSPENDED = "suspended",
    REVOKED = "revoked",
    PENDING = "pending"
}
declare enum EntityType {
    AI = "ai",
    HUMAN = "human",
    SYSTEM = "system",
    ORGANIZATION = "organization"
}
declare enum RelationshipType {
    COLLABORATION = "collaboration",
    MENTORSHIP = "mentorship",
    PARTNERSHIP = "partnership",
    RIVALRY = "rivalry",
    NEUTRAL = "neutral"
}
declare enum CertificateType {
    IDENTITY = "identity",
    CAPABILITY = "capability",
    TRUST = "trust",
    SECURITY = "security"
}
interface RelationshipEvent {
    timestamp: Date;
    type: string;
    description: string;
    impact: number;
}
interface RelationshipMetadata {
    context: string;
    environment: string;
    frequency: number;
    quality: number;
}
interface TrustNode {
    id: string;
    type: EntityType;
    trustLevel: number;
    reputation: number;
    lastInteraction: Date;
}
interface TrustEdge {
    source: string;
    target: string;
    trust: number;
    confidence: number;
    lastUpdated: Date;
}
interface CentralityMetrics {
    degree: number;
    betweenness: number;
    closeness: number;
    eigenvector: number;
}
interface ClusteringMetrics {
    coefficient: number;
    modularity: number;
    communities: string[];
}
interface ResilienceMetrics {
    robustness: number;
    recovery: number;
    adaptation: number;
}
interface IdentityEvent {
    timestamp: Date;
    type: string;
    description: string;
    impact: number;
    metadata: Record<string, any>;
}
interface Timeline {
    start: Date;
    end: Date;
    events: IdentityEvent[];
    phases: TimelinePhase[];
}
interface TimelinePhase {
    name: string;
    start: Date;
    end: Date;
    description: string;
    characteristics: string[];
}
interface Milestone {
    id: string;
    name: string;
    description: string;
    achievedAt: Date;
    significance: number;
    evidence: string[];
}
interface EvolutionStage {
    name: string;
    start: Date;
    end?: Date;
    characteristics: string[];
    capabilities: string[];
    limitations: string[];
}
interface Adaptation {
    id: string;
    trigger: string;
    response: string;
    effectiveness: number;
    timestamp: Date;
}
interface Learning {
    id: string;
    concept: string;
    proficiency: number;
    confidence: number;
    acquiredAt: Date;
    source: string;
}
interface Transformation {
    id: string;
    type: string;
    from: string;
    to: string;
    timestamp: Date;
    significance: number;
}
interface PermissionCondition {
    type: string;
    value: any;
    operator: string;
}

/**
 * Memory System Types
 *
 * Core type definitions for AI memory management
 */
interface MemorySystem {
    store(memory: Memory$1): Promise<void>;
    retrieve(query: any): Promise<Memory$1[]>;
    consolidate(): Promise<void>;
    compress(): Promise<void>;
    initialize(): Promise<void>;
    shutdown(): Promise<void>;
    getMemories(): Promise<Memory$1[]>;
    setMemories(memories: Memory$1[]): Promise<void>;
}
interface Memory$1 {
    id: string;
    type: string;
    content: string;
    metadata: Record<string, any>;
    timestamp: Date;
}
declare enum MemoryType {
    EPISODIC = "episodic",
    SEMANTIC = "semantic",
    PROCEDURAL = "procedural",
    WORKING = "working",
    META = "meta"
}
interface MemoryMetadata {
    source: string;
    timestamp: Date;
    quality: number;
    confidence: number;
    importance: number;
    tags: string[];
    context: Record<string, any>;
}

/**
 * Security Types
 *
 * Core type definitions for AI persistence security
 */
interface SecurityFramework {
    encrypt(data: any): Promise<EncryptedData$1>;
    decrypt(encryptedData: EncryptedData$1): Promise<any>;
    authenticate(credentials: Credentials$1): Promise<AuthResult$1>;
    authorize(identity: string, resource: string, action: string): Promise<boolean>;
    initialize(): Promise<void>;
    shutdown(): Promise<void>;
}
interface EncryptedData$1 {
    data: string;
    algorithm: string;
    keyId: string;
    iv: string;
    timestamp: Date;
}
interface Credentials$1 {
    username: string;
    password: string;
}
interface AuthResult$1 {
    success: boolean;
    token?: string;
    expiresAt?: Date;
    identity?: string;
}

/**
 * AI Persistence Core Interface
 *
 * Main interface for the AI persistence system
 */

interface AIPersistenceCore$1 {
    identity: AIIdentity;
    memory: MemorySystem;
    security: SecurityFramework;
    initialize(): Promise<void>;
    shutdown(): Promise<void>;
    getStatus(): Promise<SystemStatus>;
    getHealth(): Promise<HealthStatus>;
    createIdentity(config: IdentityConfig$2): Promise<AIIdentity>;
    updateIdentity(id: string, updates: IdentityUpdate): Promise<AIIdentity>;
    deleteIdentity(id: string): Promise<void>;
    getIdentity(id: string): Promise<AIIdentity>;
    storeMemory(memory: Memory): Promise<void>;
    retrieveMemory(query: MemoryQuery): Promise<Memory[]>;
    consolidateMemory(): Promise<void>;
    compressMemory(): Promise<void>;
    authenticate(credentials: Credentials): Promise<AuthResult>;
    authorize(identity: string, resource: string, action: string): Promise<boolean>;
    encrypt(data: any): Promise<EncryptedData>;
    decrypt(encryptedData: EncryptedData): Promise<any>;
}
interface IdentityConfig$2 {
    name: string;
    type: string;
    capabilities: string[];
    preferences: Record<string, any>;
    security: SecurityConfig$2;
}
interface IdentityUpdate {
    name?: string;
    capabilities?: string[];
    preferences?: Record<string, any>;
    security?: SecurityConfig$2;
}
interface MemoryQuery {
    type?: string;
    content?: string;
    limit?: number;
}
interface SystemStatus {
    status: 'running' | 'shutdown';
    uptime: number;
    memory: MemoryStatus;
    performance: PerformanceStatus;
    security: SecurityStatus;
    lastUpdated: Date;
}
interface HealthStatus {
    healthy: boolean;
    components: ComponentHealth[];
    metrics: HealthMetrics;
    alerts: HealthAlert[];
    lastChecked: Date;
}
interface MemoryStatus {
    total: number;
    used: number;
    available: number;
    utilization: number;
}
interface PerformanceStatus {
    latency: number;
    throughput: number;
    errorRate: number;
    responseTime: number;
}
interface SecurityStatus {
    authenticated: boolean;
    authorized: boolean;
    encrypted: boolean;
    monitored: boolean;
}
interface ComponentHealth {
    name: string;
    status: 'healthy' | 'degraded' | 'unhealthy';
    metrics: ComponentMetrics;
    lastChecked: Date;
}
interface HealthMetrics {
    cpu: number;
    memory: number;
    disk: number;
    network: number;
}
interface HealthAlert {
    id: string;
    type: AlertType;
    severity: Severity;
    message: string;
    timestamp: Date;
}
interface ComponentMetrics {
    latency: number;
    throughput: number;
    errors: number;
    availability: number;
}
interface Memory {
    id: string;
    type: string;
    content: string;
    metadata: Record<string, any>;
    timestamp: Date;
}
interface TimeRange {
    start: Date;
    end: Date;
}
interface SecurityConfig$2 {
    encryption: EncryptionConfig$2;
    authentication: AuthenticationConfig$2;
    authorization: AuthorizationConfig$2;
    privacy: PrivacyConfig;
}
interface EncryptionConfig$2 {
    algorithm: string;
    keySize: number;
    mode: string;
}
interface AuthenticationConfig$2 {
    method: string;
    strength: number;
    timeout: number;
}
interface AuthorizationConfig$2 {
    model: string;
    policies: Policy[];
}
interface PrivacyConfig {
    level: PrivacyLevel;
    anonymization: boolean;
    retention: RetentionPolicy;
}
interface Policy {
    id: string;
    name: string;
    rules: Rule[];
    enforcement: Enforcement;
}
interface Rule {
    id: string;
    condition: Condition;
    action: Action;
    priority: number;
}
interface Enforcement {
    type: string;
    severity: string;
    actions: Action[];
}
interface Condition {
    type: string;
    value: any;
    operator: string;
}
interface Action {
    type: string;
    parameters: Record<string, any>;
}
interface RetentionPolicy {
    duration: number;
    conditions: Condition[];
    actions: Action[];
}
interface EncryptedData {
    data: string;
    algorithm: string;
    keyId: string;
    timestamp: Date;
}
interface Credentials {
    username: string;
    password: string;
}
interface AuthResult {
    success: boolean;
    token?: string;
    expiresAt?: Date;
    identity?: string;
}
interface Permission {
    id: string;
    resource: string;
    action: string;
    conditions: Condition[];
}
declare enum IdentityType {
    AI = "ai",
    HUMAN = "human",
    SYSTEM = "system",
    ORGANIZATION = "organization"
}
declare enum SystemStatusType {
    INITIALIZING = "initializing",
    RUNNING = "running",
    MAINTENANCE = "maintenance",
    ERROR = "error",
    SHUTDOWN = "shutdown"
}
declare enum ComponentStatus {
    HEALTHY = "healthy",
    WARNING = "warning",
    ERROR = "error",
    UNKNOWN = "unknown"
}
declare enum AlertType {
    SECURITY = "security",
    PERFORMANCE = "performance",
    SYSTEM = "system",
    HEALTH = "health"
}
declare enum Severity {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    CRITICAL = "critical"
}
declare enum PrivacyLevel {
    PUBLIC = "public",
    PROTECTED = "protected",
    PRIVATE = "private",
    CONFIDENTIAL = "confidential"
}

/**
 * AI Persistence Core Implementation
 *
 * Main implementation of the AI persistence system
 */

declare class AIPersistenceCoreImpl implements AIPersistenceCore$1 {
    private config;
    private initialized;
    private startTime;
    private identities;
    identity: AIIdentity;
    private memories;
    security: SecurityFramework;
    memory: MemorySystem;
    private state;
    private checkpoints;
    private learningProgress;
    constructor(config: PersistenceConfig$1);
    initialize(): Promise<void>;
    shutdown(): Promise<void>;
    getStatus(): Promise<SystemStatus>;
    getHealth(): Promise<HealthStatus>;
    createIdentity(config: IdentityConfig$1): Promise<AIIdentity>;
    updateIdentity(id: string, updates: {
        name?: string;
        capabilities?: string[];
        preferences?: Record<string, any>;
    }): Promise<AIIdentity>;
    deleteIdentity(id: string): Promise<void>;
    getIdentity(id: string): Promise<AIIdentity>;
    storeMemory(memory: {
        type: string;
        content: string;
        metadata: Record<string, any>;
    }): Promise<void>;
    retrieveMemory(query: MemoryQuery): Promise<Memory$1[]>;
    consolidateMemory(): Promise<void>;
    compressMemory(): Promise<void>;
    authenticate(credentials: Credentials$1): Promise<AuthResult$1>;
    authorize(identity: string, resource: string, action: string): Promise<boolean>;
    encrypt(data: any): Promise<EncryptedData$1>;
    decrypt(encryptedData: EncryptedData$1): Promise<any>;
    learnConcept(conceptData: ConceptData): Promise<void>;
    getLearningProgress(): Promise<LearningProgress[]>;
    getState(): Promise<SystemState>;
    saveState(): Promise<void>;
    loadState(): Promise<SystemState | null>;
    restoreState(): Promise<void>;
    restoreFromState(state: SystemState): Promise<void>;
    createCheckpoint(checkpointData: CheckpointData): Promise<Checkpoint>;
    getLastCheckpoint(): Promise<Checkpoint | null>;
    restoreFromCheckpoint(checkpoint: Checkpoint): Promise<void>;
    restoreLearningProgress(): Promise<void>;
    private initializeCore;
    private generateFingerprint;
    private generateHyperbolicPosition;
    private generateEmbedding;
    private getMemoryStatus;
    private getPerformanceStatus;
    private getSecurityStatus;
    private getComponentHealth;
    private getHealthMetrics;
    private getHealthAlerts;
    private persistState;
    private loadPersistedState;
}
interface PersistenceConfig$1 {
    identity: IdentityConfig$1;
    memory: MemoryConfig$1;
    security: SecurityConfig$1;
}
interface IdentityConfig$1 {
    name: string;
    type: string;
    capabilities: any[];
    preferences: any;
}
interface MemoryConfig$1 {
    storage: StorageConfig$1;
    consolidation: ConsolidationConfig$1;
    compression: CompressionConfig$1;
}
interface SecurityConfig$1 {
    encryption: EncryptionConfig$1;
    authentication: AuthenticationConfig$1;
    authorization: AuthorizationConfig$1;
}
interface StorageConfig$1 {
    type: string;
    path: string;
    maxSize: number;
}
interface ConsolidationConfig$1 {
    threshold: number;
    strategy: string;
    frequency: number;
}
interface CompressionConfig$1 {
    algorithm: string;
    level: number;
    threshold: number;
}
interface EncryptionConfig$1 {
    algorithm: string;
    keySize: number;
    mode: string;
}
interface AuthenticationConfig$1 {
    method: string;
    strength: number;
    timeout: number;
}
interface AuthorizationConfig$1 {
    model: string;
    policies: any[];
}
interface SystemState {
    identities: AIIdentity[];
    memories: Memory$1[];
    learningProgress: LearningProgress[];
    checkpoints: Checkpoint[];
    timestamp: Date;
}
interface LearningProgress {
    id: string;
    concept: string;
    data: any;
    context: any;
    performance: number;
    timestamp: Date;
    confidence: number;
    mastery: number;
}
interface Checkpoint {
    id: string;
    name: string;
    description: string;
    timestamp: Date;
    state: SystemState;
    metadata: Record<string, any>;
}
interface ConceptData {
    concept: string;
    data: any;
    context: any;
    performance: number;
}
interface CheckpointData {
    name: string;
    description: string;
    timestamp: Date;
    metadata?: Record<string, any>;
}

/**
 * AI Persistence Core Package
 *
 * Main entry point for the AI persistence system
 */

declare class AIPersistenceCore {
    static create(config: PersistenceConfig): AIPersistenceCore;
}
interface PersistenceConfig {
    identity: IdentityConfig;
    memory: MemoryConfig;
    security: SecurityConfig;
}
interface IdentityConfig {
    name: string;
    type: string;
    capabilities: string[];
    preferences: Record<string, any>;
    security: SecurityConfig;
}
interface MemoryConfig {
    storage: StorageConfig;
    consolidation: ConsolidationConfig;
    compression: CompressionConfig;
}
interface SecurityConfig {
    encryption: EncryptionConfig;
    authentication: AuthenticationConfig;
    authorization: AuthorizationConfig;
}
interface StorageConfig {
    type: string;
    path: string;
    maxSize: number;
}
interface ConsolidationConfig {
    threshold: number;
    strategy: string;
    frequency: number;
}
interface CompressionConfig {
    algorithm: string;
    level: number;
    threshold: number;
}
interface EncryptionConfig {
    algorithm: string;
    keySize: number;
    mode: string;
}
interface AuthenticationConfig {
    method: string;
    strength: number;
    timeout: number;
}
interface AuthorizationConfig {
    model: string;
    policies: any[];
}
declare const VERSION = "1.0.0";
declare const PACKAGE_NAME = "@h2gnn/ai-persistence-core";
declare const DEFAULT_CONFIG: PersistenceConfig;

export { type AIIdentity, AIPersistenceCore, AIPersistenceCoreImpl, type Action, AlertType, type AuthResult$1 as AuthResult, type AuthenticationConfig, type AuthorizationConfig, type Checkpoint, type CheckpointData, type ComponentHealth, type ComponentMetrics, ComponentStatus, type CompressionConfig, type ConceptData, type Condition, type ConsolidationConfig, type Credentials$1 as Credentials, DEFAULT_CONFIG, type EncryptedData$1 as EncryptedData, type EncryptionConfig, type Enforcement, type HealthAlert, type HealthMetrics, type HealthStatus, type HyperbolicEmbedding, type HyperbolicPosition, type IdentityConfig, IdentityStatus, IdentityType, type IdentityUpdate, type LearningProgress, type Memory$1 as Memory, type MemoryConfig, type MemoryMetadata, type MemoryQuery, type MemoryStatus, MemoryType, PACKAGE_NAME, type PerformanceStatus, type Permission, type PersistenceConfig, type Policy, type PrivacyConfig, PrivacyLevel, type RetentionPolicy, type Rule, type SecurityConfig, type SecurityFramework, type SecurityStatus, Severity, type StorageConfig, type SystemState, type SystemStatus, SystemStatusType, type TimeRange, VERSION };

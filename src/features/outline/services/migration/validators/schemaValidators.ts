/**
 * Schema Validation Functions
 * Validates data structures against specific schema versions
 */

/**
 * Validation for version 1.0.0 schema
 */
export function validateVersion100(data: any): boolean {
  if (!data || typeof data !== 'object') {
    console.error('Data must be a valid object');
    return false;
  }

  // Check required top-level fields
  const requiredFields = ['id', 'projectName', 'version', 'story', 'characters', 'timeline', 'chapters'];
  for (const field of requiredFields) {
    if (!(field in data)) {
      console.error(`Missing required field: ${field}`);
      return false;
    }
  }

  // Validate version
  if (data.version !== '1.0.0') {
    console.error(`Invalid version: expected 1.0.0, got ${data.version}`);
    return false;
  }

  // Validate story structure
  if (!validateStoryStructure(data.story)) {
    return false;
  }

  // Validate characters array
  if (!Array.isArray(data.characters)) {
    console.error('Characters must be an array');
    return false;
  }

  // Validate timeline structure
  if (!validateTimelineStructure(data.timeline)) {
    return false;
  }

  // Validate chapters structure
  if (!validateChaptersStructure(data.chapters)) {
    return false;
  }

  return true;
}

/**
 * Validate story structure
 */
function validateStoryStructure(story: any): boolean {
  if (!story || typeof story !== 'object') {
    console.error('Story must be a valid object');
    return false;
  }

  const requiredStoryFields = ['background', 'coreTheme', 'synopsis'];
  for (const field of requiredStoryFields) {
    if (!(field in story)) {
      console.error(`Missing story field: ${field}`);
      return false;
    }
  }

  return true;
}

/**
 * Validate timeline structure
 */
function validateTimelineStructure(timeline: any): boolean {
  if (!timeline || typeof timeline !== 'object') {
    console.error('Timeline must be a valid object');
    return false;
  }

  if (!timeline.events || !Array.isArray(timeline.events)) {
    console.error('Timeline events must be an array');
    return false;
  }

  return true;
}

/**
 * Validate chapters structure
 */
function validateChaptersStructure(chapters: any): boolean {
  if (!chapters || typeof chapters !== 'object') {
    console.error('Chapters must be a valid object');
    return false;
  }

  if (!chapters.chapters || !Array.isArray(chapters.chapters)) {
    console.error('Chapters.chapters must be an array');
    return false;
  }

  return true;
}

/**
 * Validate character structure
 */
export function validateCharacterStructure(character: any): boolean {
  if (!character || typeof character !== 'object') {
    return false;
  }

  const requiredFields = ['id', 'name', 'role'];
  return requiredFields.every(field => field in character);
}

/**
 * Validate relationship structure
 */
export function validateRelationshipStructure(relationship: any): boolean {
  if (!relationship || typeof relationship !== 'object') {
    return false;
  }

  const requiredFields = ['id', 'fromCharacter', 'toCharacter', 'type'];
  return requiredFields.every(field => field in relationship);
}